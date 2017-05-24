define [
	'backbone'
	'codemirror'
	'bluebird'
	'codemirror-ometa/hinter'
	'server-request'
	'jquery'
], (Backbone, CodeMirror, Promise, codeMirrorOmetaHinter, serverRequest, $) ->

	noneFoundMessages =
		NecessityFormulation: ['success', 'No invalid items in database']
		ObligationFormulation: ['success', 'No invalid items in database']
		PossibilityFormulation: ['error', 'No confirming instances in database']
		PermissibilityFormulation: ['error', 'No confirming instances in database']

	someFoundMessages =
		NecessityFormulation: ['error', 'Invalid items found']
		ObligationFormulation: ['error', 'Invalid items found']
		PossibilityFormulation: ['success', 'Confirming instances found']
		PermissibilityFormulation: ['success', 'Confirming instances found']

	displayMessage = do ->
		messageTypes = ['info', 'error', 'success']
		(messageBox, type, message) ->
			for messageType in messageTypes
				messageBox.toggleClass('alert-' + messageType, messageType is type)
			messageBox.text(message)

	Backbone.View.extend(
		initialize: (@options) ->

		events:
			'click #validate': 'validate'

		setTitle: (title) ->
			@options.title.text(title)

		render: ->
			@setTitle('Validate')

			html = '''
				<textarea id="validateEditor" />
				<div id="validate" class="btn btn-small btn-primary">Validate</div>
				<div id="validatemessage" class="alert" style="display:none"></div>
				<div id="results" style="display: none">
					<h3>Invalid items:</h3>
					<table class="table table-bordered table-striped">
						<thead>
							<tr></tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>'''

			@$el.html(html)
			textarea = @$('#validateEditor')

			@editor = CodeMirror.fromTextArea(textarea.get(0),
				mode: {
					name: 'sbvr'
					getOMetaEditor: => @editor
					prependText: => @model.get('content') + '\nRule: '
				}
				onKeyEvent: codeMirrorOmetaHinter(=> @model.get('content') + '\nRule: ')
				lineWrapping: true
			)

			$(window).resize(=>
				@editor.setSize(@$el.width(), 40)
			).resize()
		validate: ->
			resultsDiv = @$('#results')
			messageBox = @$('#validatemessage')
			resultsDiv.hide()
			messageBox.show()
			displayMessage(messageBox, 'info', 'Loading...')
			Promise.all([
				serverRequest('GET', '/data/')
				.then(([statusCode, result]) ->
					return result.__model
				)
				serverRequest('POST', '/validate/', {}, { rule: @editor.getValue() })
				.then(([statusCode, result]) ->
					return result
				)
			]).spread((clientModel, invalid) =>
				colNames = []
				colResourceNames = []
				colModel = []
				fkCols = []

				resourceModel = clientModel[invalid.__resourceName]
				for { dataType, fieldName } in resourceModel.fields
					resourceName = fieldName.replace(/\ /g, '_')
					if dataType == 'ForeignKey'
						colNames.push(fieldName + '(id: name)')
						fkCols.push(clientModel[resourceName])
					else
						colNames.push(fieldName)
					colModel.push(
						name: fieldName
					)
					colResourceNames.push(resourceName)

				manyToManyCols = []

				resourceName = resourceModel.resourceName
				for own modelName, model of clientModel
					if (modelNameParts = model.resourceName.split('-')).length > 2 and
							modelNameParts[0] == resourceName and
							modelNameParts[2] not in colResourceNames
						colNames.push(modelNameParts[2] + '(id: name)')
						colModel.push(
							name: modelNameParts[2]
						)
						manyToManyCols.push(model)

				Promise.map(invalid.d, (instance) ->
					Promise.all([
						Promise.map(fkCols, (model) ->
							deferredField = instance[model.modelName]
							if deferredField?
								serverRequest('GET', deferredField.__deferred.uri)
								.then(([statusCode, fkCol]) ->
									if fkCol.d.length > 0
										instance[model.modelName] = fkCol.d[0][model.idField] + ': ' + fkCol.d[0][model.referenceScheme.replace(/\ /g, '_')]
									else
										instance[model.modelName] = deferredField.__id + ' - Not Found'
								)
						)
						Promise.map(manyToManyCols, (model) ->
							serverRequest('GET', '/data/' + model.resourceName + '?$filter=' + resourceModel.resourceName + ' eq ' + instance[resourceModel.idField])
							.then(([statusCode, manyToManyCol]) ->
								Promise.map(manyToManyCol.d, (instance) ->
									fkName = model.resourceName.split('-')[2]
									serverRequest('GET', instance[fkName].__deferred.uri)
									.then(([statusCode, results]) ->
										if results.d.length > 0
											instance[fkName] = results.d[0][clientModel[fkName].referenceScheme.replace(/\ /g, '_')]
									)
								).then(->
									manyToManyCol.__model = model
									return manyToManyCol
								)
							)
						)
					]).spread((ignoredFKs, manyToManyCols) ->
						return manyToManyCols
					)
				).then((manyToManyCols) =>
					if invalid.d.length == 0
						displayMessage(messageBox, noneFoundMessages[invalid.__formulationType]...)
					else
						displayMessage(messageBox, someFoundMessages[invalid.__formulationType]...)
						resultsDiv.show()

						header = @$('thead tr')
						results = @$('tbody')
						header.empty()
						results.empty()

						for name in colNames
							column = $(document.createElement('th')).text(name)
							header.append(column)

						for instance, i in invalid.d
							for manyToManyCol in manyToManyCols[i] when manyToManyCol?
								fkName = manyToManyCol.__model.resourceName.split('-')[2]
								instance[fkName] = (manyToManyInstance[manyToManyCol.__model.idField] + ': ' + manyToManyInstance[fkName] for manyToManyInstance in manyToManyCol.d).join('\n')

							row = $(document.createElement('tr'))
							for column in colModel
								cell = $(document.createElement('td'))
								cell.text(instance[column.name.replace(/\ /g, '_')])
								row.append(cell)
							results.append(row)
					return
				)
			).catch((err) ->
				messageBox.toggleClass('alert-success alert-info', false)
				messageBox.toggleClass('alert-error', true)
				messageBox.text('Error validating')
				console.error('Error validating', err)
			)
	)
