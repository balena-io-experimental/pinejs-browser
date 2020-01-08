webpack = require 'webpack'
_ = require 'lodash'
UglifyJsPlugin = require 'uglifyjs-webpack-plugin'

clientConfigs =
	'client': require './build/client'
	'client-server': require './build/client-server'
	'ddui': require './build/ddui'
	'sbvr.co': require './build/sbvr.co'


clientDevConfigs = {}
for task, config of clientConfigs
	clientDevConfigs[task] = _.clone(config)
	clientDevConfigs[task].plugins = _.clone(config.plugins)
	config.plugins = config.plugins.concat(
		new webpack.optimize.UglifyJsPlugin(
			sourceMap: true
			uglifyOptions:
				compress:
					unused: false # We need this off for OMeta
		)
	)


module.exports = (grunt) ->
	grunt.initConfig
		clean: ['out']

		checkDependencies:
			this:
				options:
					packageManager: 'npm'
					# TODO: Enable when grunt-check-dependencies works correctly with deduped packages.
					# onlySpecified: true

		copy:
			client:
				files: [
					expand: true
					cwd: 'src/static'
					src: '**'
					dest: 'out/static'
				]

		gitinfo:
			commands:
				describe: ['describe', '--tags', '--always', '--long', '--dirty']

		htmlmin:
			client:
				options:
					removeComments: true
					removeCommentsFromCDATA: true
					collapseWhitespace: false
				files: [
					src: 'src/index.html'
					dest: 'out/index.html'
				]

		imagemin:
			client:
				options:
					optimizationLevel: 3
				files: [
					expand: true
					cwd: 'out/static/'
					src: '*'
					dest: 'out/static/'
				]


		webpack: clientConfigs
		'webpack-dev-server':
			_.mapValues clientDevConfigs, (config) ->
				contentBase: 'src/'
				webpack: config

	require('load-grunt-tasks')(grunt)

	grunt.registerTask 'version', ->
		grunt.task.requires('gitinfo:describe')
		grunt.option('version', grunt.config.get('gitinfo.describe'))

	for task of clientConfigs
		grunt.registerTask task, [
			'copy:client'
			'imagemin:client'
			'htmlmin:client'
			'webpack:' + task
		]
