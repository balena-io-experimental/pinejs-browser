define [
	'config'
	'backbone'
], (config, Backbone) ->
	Backbone.Model.extend({
		urlRoot: config.apiServer + 'v1/users'
		validate: (attributes) ->
			if not attributes.email?
				return 'E-mail address must be specified'
			if not attributes.password?
				return 'Password must be specified'
			if attributes.password != attributes.passwordConfirm
				return 'Password values do not match'
		idAttribute: 'email'
		toJson: -> {
			email: @get('email')
			password: @get('password')
		}
	})
