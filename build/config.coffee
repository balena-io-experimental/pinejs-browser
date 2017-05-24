path = require 'path'
webpack = require 'webpack'
UMDRequirePlugin = require 'umd-require-webpack-plugin'
ExtractTextPlugin = require 'extract-text-webpack-plugin'
root = path.join(__dirname + '/..')

module.exports =
	devtool: 'source-map'
	entry: root + '/src/main.js'
	output:
		path: root + '/out'
		filename: 'main.js'
	resolve:
		root: [path.join(root, '/lib')]
		alias:
			'coffee-script/register': 'null-loader'
			'fs': 'null-loader'
			'dns': 'null-loader'
			'module': 'null-loader'
			'mysql': 'null-loader'
			'pg/lib/connection-parameters': 'null-loader'
			'pg': 'null-loader'

			'bcrypt': 'bcryptjs'
			'express': root + '/src/express'
			'underscore': 'lodash'

			'bootstrap': 'bootstrap/docs/assets/js/bootstrap'
			'codemirror$': 'codemirror/lib/codemirror'
			'codemirror-ometa': 'ometa-js/lib/codemirror-ometa'
			'ejs': 'ejs/ejs'
			'ometa-core': 'ometa-js/lib/ometajs/core'

			'templates': root + '/src/templates'
			'models': root + '/src/models'
			'views': root + '/src/views'
			'config': root + '/src/config'

			'ometa-highlighting': root + '/src/ometa-highlighting'
			'server-request': root + '/src/server-request'

			'extended-sbvr-parser': root + '/src/common/extended-sbvr-parser'
			'server-glue': root + '/src/pine/pine.js'

		extensions: [
			''
			'.js'
			'.coffee'
		]
	plugins: [
		new UMDRequirePlugin()
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
		)
		new webpack.ProvidePlugin(
			jQuery: 'jquery'
			'window.jQuery': 'jquery'
		)
		new webpack.optimize.DedupePlugin()
		new ExtractTextPlugin('main.css',
			allChunks: true
		)
		new webpack.optimize.LimitChunkCountPlugin(maxChunks: 1)
	]
	module:
		loaders: [
			{ test: /[\/\\]bootstrap.js/, loader: 'imports-loader?__css__=../css/bootstrap.css' }
			{ test: /[\/\\]show-hint.js/, loader: 'imports-loader?__css__=codemirror/addon/hint/show-hint.css' }
			{ test: /[\/\\]codemirror.js/, loader: 'imports-loader?__css__=codemirror/lib/codemirror.css' }
			{ test: /[\/\\]backbone.js/, loader: 'imports-loader?this=>' + encodeURIComponent('{$:require("jquery"), _:require("lodash")}') }

			{ test: /[\/\\]d3.js/, loader: 'exports-loader?d3' }
			{ test: /[\/\\]ejs.js/, loader: 'exports-loader?ejs' }
			{ test: /[\/\\]uglify-js.js/, loader: 'exports-loader?UglifyJS' }

			{ test: /\.(html|sbvr)$/, loader: 'raw-loader' }
			{ test: /\.ometa(js)?$/, loader: 'ometa-loader' }
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
			{ test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' }
			{ test: /\.jpg$/, loader: 'url-loader?limit=100000&mimetype=image/jpg' }
			{ test: /\.coffee$/, loader: 'coffee-loader' }
		]
