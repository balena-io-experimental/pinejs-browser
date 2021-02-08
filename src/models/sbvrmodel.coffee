define ['config', 'backbone', 'server-glue'], (config, Backbone, { ExtendedSBVRParser }) ->
	Backbone.Model.extend({
		defaults:
			id: null
			content: ''
		compile: do ->
			sbvrParser = ExtendedSBVRParser.createInstance()
			sbvrParser.enableReusingMemoizations(sbvrParser._sideEffectingRules)
			return ->
				sbvrParser.reset()
				return sbvrParser.matchAll(@get('content'), 'Process')
		urlRoot: config.apiServer + 'v1/models'
	})
