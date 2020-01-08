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
		descriptionFiles: ['package.json', 'bower.json']
		modules: [
			path.join(root, '/lib')
			'node_modules'
		]
		alias:
			'coffee-script/register': 'null-loader'
			'fs': 'null-loader'
			'dns': 'null-loader'
			'module': 'null-loader'
			'mysql': 'null-loader'
			'net': 'null-loader'
			'pg/lib/connection-parameters': 'null-loader'
			'pg': 'null-loader'

			'bcrypt': 'bcryptjs'
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
			'.js'
			'.coffee'
		]
	plugins: [
		new UMDRequirePlugin()
		new webpack.ProvidePlugin(
			jQuery: 'jquery'
			'window.jQuery': 'jquery'
		)
		new ExtractTextPlugin(
			filename: 'main.css'
			allChunks: true
		)
		new webpack.optimize.LimitChunkCountPlugin(maxChunks: 1)
	]
	module:
		rules: [
			{ test: /[\/\\]bootstrap.js/, use: 'imports-loader?__css__=../css/bootstrap.css' }
			{ test: /[\/\\]show-hint.js/, use: 'imports-loader?__css__=codemirror/addon/hint/show-hint.css' }
			{ test: /[\/\\]codemirror.js/, use: 'imports-loader?__css__=codemirror/lib/codemirror.css' }
			{ test: /[\/\\]backbone.js/, use: 'imports-loader?this=>' + encodeURIComponent('{$:require("jquery"), _:require("lodash")}') }

			{ test: /[\/\\]d3.js/, use: 'exports-loader?d3' }
			{ test: /[\/\\]ejs.js/, use: 'exports-loader?ejs' }
			{ test: /[\/\\]uglify-js.js/, use: 'exports-loader?UglifyJS' }

			{ test: /\.(html|sbvr)$/, use: 'raw-loader' }
			{ test: /\.ometa(js)?$/, use: 'ometa-loader' }
			{ test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) }
			{ test: /\.png$/, use: 'url-loader?limit=100000&mimetype=image/png' }
			{ test: /\.jpg$/, use: 'url-loader?limit=100000&mimetype=image/jpg' }
			{ test: /\.coffee$/, use: 'coffee-loader' }
		]
