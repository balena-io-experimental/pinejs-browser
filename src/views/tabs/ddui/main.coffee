define [
	'backbone'
	'./ClientURIParser.ometajs'
	'./drawDataUI'
	'jquery-ui'
	'views/tabs/sbvr-server/main'
	'./jquery-ui.css'
], (Backbone, ClientURIParser, drawDataUI) ->
	Backbone.View.extend(
		initialize: (@options) ->

		setTitle: (title) ->
			@options.title.text(title)

		render: ->
			@setTitle('Data Editor')

			window.dduiState = (state) =>
				drawDataUI ClientURIParser.matchAll(state, 'expr')[1], (err, html) =>
					if err
						console.error(err)
					else
						@$el.html("""
							<div id="dataTab"
								aria-labelledby="ui-id-9"
								class="ui-tabs-panel ui-widget-content ui-corner-bottom"
								role="tabpanel"
								style="display: block;"
								aria-expanded="true"
								aria-hidden="false">#{html}</div>
							""")

			window.dduiState('#!/data')
	)
