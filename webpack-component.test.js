// const LivereloadPlugin = require('webpack-livereload-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

//this is the directory of the target component to test
let polyfill        = 'babel-polyfill';
let targetComponent = __dirname+'/tests/components/index.js';
__webpack_public_path__ = '/';
module.exports = {
	mode: 'development',
	entry: [polyfill, targetComponent],
	output: {
		filename: 'test.bundle.js',
		path: __dirname+'/tests/components/bundle/'
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
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3002,
			server: {
				baseDir: ['./tests/components/', './public/']
			}
		})
	],
	resolve: {
		alias: {
			Actions: __dirname+'/src/shared/actions/',
			Containers: __dirname+'/src/shared/containers/',
			Components: __dirname+'/src/shared/components/',
			Utils: __dirname+'/src/shared/utils/',
			Shared: __dirname+'/src/shared/',
			Auth: __dirname+'/src/shared/auth/',
			Classes: __dirname+'/src/shared/classes/',
			Config: __dirname+'/src/shared/config/',
			Redux: __dirname+'/src/shared/redux/'
		}
	}
};
