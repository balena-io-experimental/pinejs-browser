define [
	'./ClientURIUnparser.ometajs'
	'ejs'
	'./widgets'
	'async'
	'bluebird'
	'lodash'
	'server-request'
	'jquery'
	'./runTrans'
], (ClientURIUnparser, ejs, widgets, async, Promise, _, serverRequest, $) ->
	templates = {
		widgets: widgets
		hiddenFormInput: ejs.compile('''
			<input type="hidden" id="__actype" value="<%= action %>">
			<input type="hidden" id="__type" value="<%= resourceModel.resourceName %>">
			<input type="hidden" id="__serverURI" value="<%= serverURI %>">
			<input type="hidden" id="__backURI" value="<%= backURI %>"><%
			if(id !== false) { %>
				<input type="hidden" id="__id" value="<%= id %>"><%
			} %>
			''')
		dataTypeDisplay: ejs.compile('''
			<%
			if(resourceField.dataType !== "Serial" || action === "view") {
				var fieldName = resourceField.fieldName,
					onChange = (fieldName == resourceModel.referenceScheme ? "updateForeignKey('" + resourceModel.resourceName + "', '" + id + "', this);" : false),
					isNullable = !resourceField.required,
					fieldValue = resourceInstance === false ? "" : resourceInstance[fieldName],
					fieldIdentifier = resourceModel.resourceName + "." + fieldName;
				if(resourceField.dataType === "ForeignKey") {
					updateOnForeignKeyChange(fieldName, fieldIdentifier);
				} %>
				<td><%= fieldName %>:</td><td><%- templates.widgets(resourceField.dataType, action, fieldIdentifier, fieldValue, isNullable, onChange, foreignKeys[fieldName]) %></td><%
			} %>
			''')
		viewAddEditResource: ejs.compile('''
			<div class="panel" style="background-color:<%= backgroundColour %>;">
				<form class="action">
					<%- templates.hiddenFormInput(locals) %>
					<table><%
						for(var i = 0; i < resourceModel.fields.length; i++) { %>
							<tr>
								<%-
									templates.dataTypeDisplay({
										templates: templates,
										resourceInstance: resourceInstance,
										resourceModel: resourceModel,
										resourceField: resourceModel.fields[i],
										foreignKeys: foreignKeys,
										action: action,
										id: id
									})
								%>
							</tr><%
						} %>
					</table><%
					if(action !== "view") { %>
						<div align="right">
							<input type="submit" value="Submit This" onClick="processForm(this.parentNode.parentNode);return false;">
						</div><%
					} %>
				</form>
			</div>
			''')
		deleteResource: ejs.compile('''
			<div class="panel" style="background-color:<%= backgroundColour %>;">
				<div align="left">
					marked for deletion
					<div align="right">
						<form class="action">
							<%- templates.hiddenFormInput(locals) %>
							<input type="submit" value="Confirm" onClick="processForm(this.parentNode.parentNode);return false;">
						</form>
					</div>
				</div>
			</div>
			''')
		factTypeCollection: ejs.compile('''
			<%
			for(var i = 0; i < factTypeCollections.length; i++) {
				var factTypeCollection = factTypeCollections[i]; %>
				<tr id="tr--data--<%= factTypeCollection.resourceName %>">
					<td><%
						if(factTypeCollection.isExpanded) { %>
							<div style="display:inline;background-color:<%= altBackgroundColour %>">
								<%= factTypeCollection.resourceName.replace(/[_-]/g, ' ') %>
								<a href="<%= factTypeCollection.closeURI %>" onClick="dduiState('<%= factTypeCollection.closeHash %>');return false">
									<span title="Close" class="ui-icon ui-icon-circle-close"></span>
								</a>
							</div>
							<%- factTypeCollection.html %><%
						}
						else { %>
							<%= factTypeCollection.resourceName.replace(/[_-]/g, ' ') %>
							<a href="<%= factTypeCollection.expandURI %>" onClick="dduiState('<%= factTypeCollection.expandHash %>');return false">
								<span title="See all" class="ui-icon ui-icon-search"></span>
							</a><%
						} %>
					</td>
				</tr><%
			} %>
			''')
		resourceCollection: ejs.compile('''
			<div class="panel" style="background-color:<%= backgroundColour %>;">
				<table id="tbl--<%= pid %>">
					<tbody><%
						for(var i = 0; i < resourceCollections.length; i++) {
							var resourceCollection = resourceCollections[i]; %>
							<tr id="tr--<%= pid %>--<%= resourceCollection.id %>">
								<td><%
									if(resourceCollection.isExpanded) { %>
										<div style="display:inline;background-color:<%= altBackgroundColour %>">
											<%- resourceCollection.resourceName %>
											<a href="<%= resourceCollection.closeURI %>" onClick="dduiState('<%= resourceCollection.closeHash %>');return false"><%
												switch(resourceCollection.action) {
													case "view":
													case "edit":
														%><span title="Close" class="ui-icon ui-icon-circle-close"></span><%
													break;
													case "del":
														%>[unmark]<%
												} %>
											</a>
										</div>
										<%- resourceCollection.html %><%
									}
									else { %>
										<%- resourceCollection.resourceName %><%
										if(resourceModel.actions.indexOf("view") !== -1) { %>
											<a href="<%= resourceCollection.viewURI %>"
												onClick="dduiState('<%= resourceCollection.viewHash %>');return false"
											><span title="View" class="ui-icon ui-icon-search"></span></a><%
										}
										if(resourceModel.actions.indexOf("edit") !== -1) { %>
											<a href="<%= resourceCollection.editURI %>"
												onClick="dduiState('<%= resourceCollection.editHash %>');return false"
											><span title="Edit" class="ui-icon ui-icon-pencil"></span></a><%
										}
										if(resourceModel.actions.indexOf("delete") !== -1) { %>
											<a href="<%= resourceCollection.deleteURI %>"
												onClick="dduiState('<%= resourceCollection.deleteHash %>');return false"
											><span title="Delete" class="ui-icon ui-icon-trash"></span></a><%
										}
									} %>
								</td>
							</tr><%
						} %>
						<tr>
							<td>
								<hr style="border:0px; width:90%; background-color: #999; height:1px;">
							</td>
						</tr>
						<tr>
							<td>
								<a href="<%= addURI %>" onClick="dduiState('<%= addHash %>');return false;">[(+)add new]</a>
							</td>
						</tr><%
						for(var i = 0; i < addsHTML.length; i++) { %>
							<tr>
								<td>
									<%- addsHTML[i] %>
								</td>
							</tr><%
						} %>
						<tr>
							<td>
								<hr style="border:0px; width:90%; background-color: #999; height:1px;">
							</td>
						</tr>
						<%- templates.factTypeCollection(locals) %>
					</tbody>
				</table>
			</div>
			''')
		factTypeName: ejs.compile('''
				<%
				for(var i = 0; i < factType.length; i++) {
					var factTypePart = factType[i],
						partName = factTypePart[1];
					if(factTypePart[0] == "Term") {
						// Foreign key
						if(foreignKeys.hasOwnProperty(partName)) {
							var foreignKeyInstances = foreignKeys[partName],
								foreignKey = instance[partName].__id,
								referenceScheme = foreignModels[partName].referenceScheme;
								if(foreignKeyInstances.hasOwnProperty(foreignKey)) { %>
									<%= foreignKeyInstances[foreignKey][referenceScheme] %><%
								}
								else { %>
									Unknown (<%= foreignKey %>)<%
								}
						}
						// Attribute
						else { %>
							<%= instance[partName] %><%
						}
					}
					else if(factTypePart[0] == "Verb") { %>
						<em><%= partName %></em><%
					}
				} %>
				''')
		topLevelTemplate: ejs.compile('''
			<table id="terms">
				<tbody><%
					for(var i = 0; i < topLevelResources.length; i++) {
						var resource = topLevelResources[i],
							modelName = resource.modelName; %>
						<tr id="tr--data--"<%= resource.resourceName %>">
							<td><%
								if(resource.isExpanded) { %>
									<div style="display:inline; background-color:#FFFFFF;">
										<%= modelName %>
										<a href="<%= resource.closeURI %>" onClick="dduiState('<%= resource.closeHash %>');return false">
											<span title="Close" class="ui-icon ui-icon-circle-close"></span>
										</a>
									</div>
									<%- resource.html %><%
								}
								else { %>
									<%= modelName %>
									<a href="<%= resource.expandURI %>" onClick="dduiState('<%= resource.expandHash %>');return false">
										<span title="See all" class="ui-icon ui-icon-search"></span>
									</a><%
								} %>
							</td>
						</tr><%
					} %>
				</tbody>
			</table><br/>
			<div align="left">
				<input type="button" value="Apply All Changes" onClick="runTrans($('#terms'));return false;">
			</div>
			''')
	}
	baseTemplateVars =
		templates: templates
	evenTemplateVars =
		backgroundColour: '#FFFFFF'
		altBackgroundColour: '#EEEEEE'
	oddTemplateVars =
		backgroundColour: '#EEEEEE'
		altBackgroundColour: '#FFFFFF'

	createNavigableTree = (tree, descendTree = []) ->
		tree = $.extend(true, [], tree)
		descendTree = $.extend(true, [], descendTree)

		previousLocations = []
		currentLocation = tree

		_getInstanceID = (leaf) ->
			if leaf[1][1]?
				return leaf[1][1]
			else
				for mod in leaf[2] when mod[0] == 'filt' and mod[1][0] == 'eq'
					return mod[1][3]

		getIndexForResource = (resourceName, resourceID) ->
			for leaf, j in currentLocation when leaf[0] in ['collection', 'instance'] and leaf[1]?[0] == resourceName and (
				!resourceID? or (_getInstanceID(leaf) == resourceID)
			)
				return j
			return false

		ascend = ->
			currentLocation = previousLocations.pop()
			return descendTree.pop()

		descendByIndex = (index) ->
			descendTree.push(index)
			previousLocations.push(currentLocation)
			currentLocation = currentLocation[index]

		# Descend to correct level
		for index in descendTree
			previousLocations.push(currentLocation)
			currentLocation = currentLocation[index]

		return {
			# Can get rid of?
			getInstanceID: -> _getInstanceID(currentLocation)
			getCurrentLocation: -> return currentLocation
			getCurrentIndex: -> return descendTree[descendTree.length - 1]
			descendByIndex: (index) ->
				descendByIndex(index)
				return this
			getAbout: ->
				if currentLocation[1]?[0]?
					currentLocation[1][0]
				else
					currentLocation[0]
			getAction: (resourceName, resourceID) ->
				index = getIndexForResource(resourceName, resourceID)
				if index != false
					currBranch = currentLocation[index]
				else
					currBranch = currentLocation
				for currBranchType in currBranch[2][1..] when currBranchType[0] in ['view', 'add', 'edit', 'del']
					return currBranchType[0]
				return 'view'
			getPid: ->
				pidTree = tree
				pid = pidTree[1][0]
				for index in descendTree
					pidTree = pidTree[index]
					if pidTree[0] is 'collection'
						pid += '--' + pidTree[1][0]
					else
						pid += '--' + pidTree[1][1]
				return pid
			# Needed
			getVocabulary: ->
				return tree[1][0]
			getServerURI: ->
				op =
					eq: 'eq'
					ne: 'ne'
					lk: 'like'
				filters = []
				for leaf in currentLocation[2] when leaf[0] == 'filt'
					leaf = leaf[1]
					if leaf[1][0] == undefined
						# The resource name - not currently used in filter
						leaf[1] = @getAbout()
					filters.push([leaf[2], op[leaf[0]], leaf[3]])
				return serverAPI(@getVocabulary(), @getAbout(), filters)
			isExpanded: (resourceName, resourceID) -> getIndexForResource(resourceName, resourceID) != false
			descend: (resourceName, resourceID) ->
				index = getIndexForResource(resourceName, resourceID)
				descendByIndex(index)
				return this
			modify: (action, change) ->
				switch action
					when 'add'
						currentLocation.push(change)
					when 'del'
						oldIndex = ascend()
						currentLocation.splice(oldIndex, 1)
				return this
			getURI: ->
				try
					return ClientURIUnparser.match(tree, 'trans')
				catch e
					console.error('Could not "unparse" client uri', e)
					throw e
			clone: ->
				return createNavigableTree(tree, descendTree)
			getChangeURI: (action, resourceModel, resourceID) ->
				mods = [ 'mod', [ action ] ]
				if resourceID?
					mods.push(['filt', ['eq', [], resourceModel.idField, resourceID]])
				return @getNewURI('add', [ 'instance', [resourceModel.resourceName], mods ])
			getNewURI: (action, change) ->
				return @clone().modify(action, change).getURI()
		}

	getInstanceID = (instance, resourceModel) ->
		instanceID = instance[resourceModel.idField]
		if _.isObject(instanceID)
			return instanceID.__id
		else
			return instanceID

	foreignKeysCache = do ->
		fetchedResults = {}
		foreignKeyResults = {}
		clientModel = {}
		updateListeners = {}
		return {
			clear: ->
				fetchedResults = {}
				foreignKeyResults = {}
				clientModel = {}
				updateListeners = {}
			setClientModel: (_clientModel) ->
				clientModel = _clientModel
			setField: (foreignKey, id, fieldName, fieldValue) ->
				if foreignKeyResults.hasOwnProperty(foreignKey) and foreignKeyResults[foreignKey].hasOwnProperty(id)
					instance = foreignKeyResults[foreignKey][id]
				else
					instance = {}
				instance[fieldName] = fieldValue
				@set(foreignKey, id, instance)
			listen: (foreignKey, callback) ->
				if !updateListeners[foreignKey]
					updateListeners[foreignKey] = []
				updateListeners[foreignKey].push(callback)
			set: (foreignKey, id, instance) ->
				if !foreignKeyResults.hasOwnProperty(foreignKey)
					foreignKeyResults[foreignKey] = {}
				foreignKeyResults[foreignKey][id] = instance
				if updateListeners[foreignKey]
					for callback in updateListeners[foreignKey]
						callback(id, instance, clientModel[foreignKey])
			get: (tree, resourceModel, successCallback) ->
				Promise.map(resourceModel.fields, ({ fieldName, dataType }) ->
					if dataType not in ['ForeignKey', 'ConceptType']
						return
					# Get results for all the foreign keys
					foreignKey = fieldName
					if !fetchedResults.hasOwnProperty(foreignKey)
						if !foreignKeyResults.hasOwnProperty(foreignKey)
							foreignKeyResults[foreignKey] = {}
						fetchedResults[foreignKey] =
							serverRequest('GET', serverAPI(tree.getVocabulary(), foreignKey))
							.then(([statusCode, result]) ->
								for instance in result.d
									instanceID = getInstanceID(instance, clientModel[foreignKey])
									if !foreignKeyResults[foreignKey][instanceID]
										foreignKeyResults[foreignKey][instanceID] = instance
								return
							).catch(->
								throw new Error('Error fetching ' + foreignKey)
							)
					return fetchedResults[foreignKey]
				).then(->
					successCallback(foreignKeyResults, clientModel)
				).catch((err) ->
					console.error(err)
				)
		}

	window.updateForeignKey = (foreignKey, id, element) ->
		element = $(element)
		fieldName = element.attr('id')
		foreignKeysCache.setField(foreignKey, id, fieldName.replace(foreignKey + '.', ''), element.val())
	window.updateOnForeignKeyChange = do ->
		selectIDsAdded = {}
		return (foreignKey, selectID) ->
			if !selectIDsAdded[selectID]
				selectIDsAdded[selectID] = true
				selectID = selectID.replace(/\./g, '\\.')
				foreignKeysCache.listen foreignKey, (id, newInstance, resourceModel) ->
					console.log($('#' + selectID))
					newValue = newInstance[resourceModel.referenceScheme]
					$('#' + selectID).each (index) ->
						$this = $(this)
						option = $this.children('*[value="' + id + '"]')
						if option.size() == 0
							# TODO: This should include the onChange if necessary
							$this.prepend($('<option value="' + id + '">' + newValue + '</option>'))
						else
							option.text(newValue)

	serverAPI = (vocabulary, about = '', filters = [], includeModel = false) ->
		# render filters
		query = []

		if includeModel
			query.push('model=true')

		if filters.length > 0
			filters = filters.map (filter) ->
				filter[0] + ' ' + filter[1] + ' ' + filter[2]
			query.push('$filter=' + filters.join(' and '))

		queryString = ''
		if query.length > 0
			queryString = '?' + query.join('&')
		return '/' + vocabulary + '/' + about.replace(/\ /g, '_').replace(/-/g, '__') + queryString

	drawData = (tree, callback) ->
		tree = createNavigableTree(tree)
		rootURI = location.pathname
		serverRequest('GET', serverAPI(tree.getVocabulary()), {}, null,
			(statusCode, { __model: clientModel }) ->
				foreignKeysCache.clear()
				foreignKeysCache.setClientModel(clientModel)
				addResourceID = 1

				renderInstance = (ftree, even, callback) ->
					templateVars = $.extend({}, baseTemplateVars, (if even then evenTemplateVars else oddTemplateVars), {
						serverURI: ftree.getServerURI()
						backURI: '#!/' + ftree.getNewURI('del')
					})

					action = ftree.getAction()
					switch action
						when 'view', 'edit'
							serverRequest('GET', ftree.getServerURI(), {}, null,
								(statusCode, result) ->
									resourceModel = clientModel[ftree.getAbout()]
									instanceID = getInstanceID(result.d[0], resourceModel)
									foreignKeysCache.get ftree, resourceModel, (foreignKeys) ->
										templateVars = $.extend(templateVars, {
											action: action
											id: instanceID
											resourceInstance: result.d[0]
											resourceModel: resourceModel
											foreignKeys: foreignKeys
										})
										html = templates.viewAddEditResource(templateVars)
										callback(null, html)
								(statusCode, errors) ->
									console.error(errors)
									callback('Errors: ' + errors)
							)
						when 'add'
							resourceModel = clientModel[ftree.getAbout()]
							foreignKeysCache.get ftree, resourceModel, (foreignKeys) ->
								addID = '$' + addResourceID++
								instance = {}
								instance[resourceModel.idField] = addID
								if resourceModel.idField != resourceModel.referenceScheme
									instance[resourceModel.referenceScheme] = ''
								foreignKeysCache.set(resourceModel.name, addID, instance)
								templateVars = $.extend(templateVars, {
									action: action
									id: addID
									resourceInstance: false
									resourceModel: resourceModel
									foreignKeys: foreignKeys
								})
								html = templates.viewAddEditResource(templateVars)
								callback(null, html)
						when 'del'
							templateVars = $.extend(templateVars, {
								resourceModel: clientModel[ftree.getAbout()]
								action: action
								id: ftree.getInstanceID()
							})
							html = templates.deleteResource(templateVars)
							callback(null, html)

				renderResource = (rootURI, even, ftree, cmod, callback) ->
					currentLocation = ftree.getCurrentLocation()
					about = ftree.getAbout()
					resourceType = 'Term'
					resourceFactType = []

					# TODO: This needs to be given by the server rather than generated here
					getIdent = (mod) ->
						switch mod[0]
							when 'Term', 'Verb'
								mod[1].replace(new RegExp(' ', 'g'), '_')
							when 'FactType'
								ident = []
								for factTypePart in mod[1...-1]
									ident.push(getIdent(factTypePart))
								return ident.join('-')
							else
								return ''

					# is the thing we're talking about a term or a fact type?
					for mod in cmod[1..] when getIdent(mod) == about
						resourceType = mod[0]
						if resourceType == 'FactType'
							resourceFactType = mod[1..]

					if currentLocation[0] is 'collection'
						serverRequest('GET', ftree.getServerURI(), {}, null,
							(statusCode, result) ->
								resourceModel = clientModel[ftree.getAbout()]
								async.parallel({
									resourceCollections: (resourceCollectionsCallback) ->
										async.map(result.d,
											(instance, callback) ->
												# render each child and call back
												instanceID = getInstanceID(instance, resourceModel)
												resourceCollection =
													isExpanded: ftree.isExpanded(about, instanceID)
													action: ftree.getAction(about, instanceID)
													id: instanceID

												async.parallel([
													(callback) ->
														if resourceType == 'Term'
															resourceCollection.resourceName = instance[resourceModel.referenceScheme]
															callback()
														else if resourceType == 'FactType'
															foreignKeysCache.get ftree, resourceModel, (foreignKeys, foreignModels) ->
																templateVars = $.extend({}, baseTemplateVars, (if even then evenTemplateVars else oddTemplateVars), {
																	foreignKeys: foreignKeys
																	foreignModels: foreignModels
																	factType: resourceFactType
																	instance: instance
																})
																resourceCollection.resourceName = templates.factTypeName(templateVars)
																callback()
													(callback) ->
														if resourceCollection.isExpanded
															expandedTree = ftree.clone().descend(about, instanceID)
															resourceCollection.closeHash = '#!/' + expandedTree.getNewURI('del')
															resourceCollection.closeURI = rootURI + resourceCollection.deleteHash
															renderResource rootURI, not even, expandedTree, cmod, (err, html) ->
																resourceCollection.html = html
																callback(err)
														else
															resourceCollection.viewHash = '#!/' + ftree.getChangeURI('view', resourceModel, instanceID)
															resourceCollection.viewURI = rootURI + resourceCollection.viewHash
															resourceCollection.editHash = '#!/' + ftree.getChangeURI('edit', resourceModel, instanceID)
															resourceCollection.editURI = rootURI + resourceCollection.editHash
															resourceCollection.deleteHash = '#!/' + ftree.getChangeURI('del', resourceModel, instanceID)
															resourceCollection.deleteURI = rootURI + resourceCollection.deleteHash
															callback()
													],
													(err) ->
														callback(err, resourceCollection)
												)
											resourceCollectionsCallback
										)
									addsHTML: (addsHTMLCallback) ->
										addTrees = []
										for currBranch, j in currentLocation[3..] when currBranch[0] == 'instance' and currBranch[1][0] == about and currBranch[1][1] == undefined
											for currBranchType in currBranch[2] when currBranchType[0] == 'add'
												addTrees.push(ftree.clone().descendByIndex(j + 3))
												break
										async.map(addTrees,
											(addTree, callback) ->
												renderResource rootURI, not even, addTree, cmod, (err, html) ->
													callback(err, html)
											addsHTMLCallback
										)
									factTypeCollections: (factTypeCollectionsCallback) ->
										factTypeResources = []
										# Get a list of the fact type collections to add.
										for mod in cmod[1..] when mod[0] == 'FactType'
											for termVerb in mod[1..] when termVerb[1] == about
												factTypeResources.push(getIdent(mod))
										async.map(factTypeResources,
											(resourceName, callback) ->
												factTypeCollection = {
													resourceName: resourceName
													isExpanded: ftree.isExpanded(resourceName)
												}
												if factTypeCollection.isExpanded
													expandedTree = ftree.clone().descend(resourceName)
													factTypeCollection.closeHash = '#!/' + expandedTree.getNewURI('del')
													factTypeCollection.closeURI = rootURI + factTypeCollection.closeHash
													renderResource rootURI, not even, expandedTree, cmod, (err, html) ->
														factTypeCollection.html = html
														callback(null, factTypeCollection)
												else
													newb = [ 'collection', [ resourceName ], [ 'mod' ] ]
													factTypeCollection.expandHash = '#!/' + ftree.getNewURI('add', newb)
													factTypeCollection.expandURI = rootURI + factTypeCollection.expandHash
													callback(null, factTypeCollection)
											factTypeCollectionsCallback
										)
									},
									(err, results) ->
										if err
											console.error(err)
											callback('Resource Collections Errors: ' + err)
										else
											addHash = '#!/' + ftree.getChangeURI('add', resourceModel)
											templateVars = $.extend({}, baseTemplateVars, (if even then evenTemplateVars else oddTemplateVars), {
												pid: ftree.getPid()
												addHash: addHash
												addURI: rootURI + addHash
												addsHTML: results.addsHTML
												factTypeCollections: results.factTypeCollections
												resourceCollections: results.resourceCollections
												resourceModel: resourceModel
											})
											html = templates.resourceCollection(templateVars)
											callback(null, html)
								)
							(statusCode, errors) ->
								console.error(errors)
								callback('Errors: ' + errors)
						)
					else if currentLocation[0] == 'instance'
						renderInstance(ftree, even, callback)

				# SECTION: Top level resources
				topLevelResources = []
				for own resourceName, resource of clientModel when resource.topLevel == true
					topLevelResources.push(resource)
				async.map(topLevelResources,
					(resource, callback) ->
						resourceName = resource.resourceName
						resource.isExpanded = tree.isExpanded(resourceName)
						if resource.isExpanded
							# SECTION: Expanded resource
							expandedTree = tree.clone().descend(resourceName)
							resource.closeHash = '#!/' + expandedTree.getNewURI('del')
							resource.closeURI = rootURI + resource.closeHash
							# request schema from server and store locally.
							serverRequest('GET', "/dev/model?$filter=model_type eq 'lf' and vocabulary eq '" + tree.getAbout() + "'", {}, null,
								(statusCode, result) ->
									renderResource rootURI, true, expandedTree, result.d[0].model_value, (err, html) ->
										resource.html = html
										callback(err, resource)
								-> callback(arguments)
							)
						else
							newb = [ 'collection', [ resourceName ], [ 'mod' ] ]
							resource.expandHash = '#!/' + tree.getNewURI('add', newb)
							resource.expandURI = rootURI + resource.expandHash
							callback(null, resource)
					(err, topLevelResources) ->
						if err?
							callback(err)
						else
							templateVars =
								topLevelResources: topLevelResources
								templates: templates
							html = templates.topLevelTemplate(templateVars)
							callback(null, html)
				)
			(statusCode, errors) ->
				console.error(errors)
				$('#dataTab').html('Errors: ' + errors)
		)

	processForm = (form) ->
		action = $('#__actype', form).val()
		serverURI = $('#__serverURI', form).val()
		id = $('#__id', form).val()
		backURI = $('#__backURI', form).val()
		# TODO: id and type (and half of actype) are not yet used.
		# Should they be used instead of serverURI?
		switch action
			when 'edit'
				submitInstance('PUT', form, serverURI, backURI)
			when 'add'
				submitInstance('POST', form, serverURI, backURI)
			when 'del'
				submitInstance('DELETE', form, serverURI, backURI)

	submitInstance = (method, form, serverURI, backURI) ->
		obj = {}
		if method != 'DELETE'
			inputs = $(':input:not(:submit)', form)
			for input in inputs when input.id[...2] != '__'
				obj[input.id] = $(input).val()
		serverRequest method, serverURI, {}, obj, ->
			window.dduiState(backURI)
		return false

	window.processForm = processForm
	return drawData
