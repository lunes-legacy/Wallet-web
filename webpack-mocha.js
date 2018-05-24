// const LivereloadPlugin = require('webpack-livereload-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

//this is the directory of the target component to test
let polyfill        = 'babel-polyfill';
let targetComponent = __dirname+'/tests/unit/index.js';
__webpack_public_path__ = '/';
module.exports = {
	mode: 'development',
	entry: [polyfill, targetComponent],
	target: 'node',
	output: {
		filename: 'index.bundle.js',
		path: __dirname+'/tests/unit/bundle/',
		libraryTarget: 'commonjs2'
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				query: {
					presets: ['es2015', 'env', 'react', 'stage-0']
				}
			}
		]
	},
	resolve: {
		alias: {
			Actions: __dirname+'/src/shared/actions/',
			Reducers: __dirname+'/src/shared/reducers',
			Containers: __dirname+'/src/shared/containers/',
			Components: __dirname+'/src/shared/components/',
			Stores: __dirname+'/src/shared/stores',
			Utils: __dirname+'/src/shared/utils',
			Shared: __dirname+'/src/shared/',
		    Auth: __dirname+'/src/shared/auth/',
		    Classes: __dirname+'/src/shared/classes/',
		    Config: __dirname+'/src/shared/config/'
		}
	}
};
