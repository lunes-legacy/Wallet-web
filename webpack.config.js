require('dotenv').load();
const HardSourcePlugin = require('hard-source-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

webpackEnv = process.env.WEBPACK_ENV;
let clientEntry  = __dirname+'/src/client/index.js';
let clientOutput = {
	path: __dirname+'/public/js/',
	filename: 'bundle.js'
};
let serverEntry  = __dirname+'/src/server/index.js';
let serverOutput;
if (webpackEnv === 'production') {
	serverOutput = {
		path: __dirname+'/functions/',
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	};
} else if (webpackEnv === 'development') {
	serverOutput = {
		path: __dirname+'/src/server/bundle/',
		filename: 'index.bundle.js',
		libraryTarget: 'commonjs2'
	};
}


let client = {
	target: 'web',
	entry: ['babel-polyfill',clientEntry],
	output: clientOutput,
	node: {
		fs: 'empty',
		net: 'empty'
	},
	mode: webpackEnv,
	module: {
		rules: [
			{
				test: /jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				query: {
					presets: ['es2015', 'env', 'react', 'stage-0']
				}
			}
		]
	},
	plugins: [
		new HardSourcePlugin()
	]
};

// externals: [nodeExternals()],
let server = {
	entry: ['babel-polyfill',serverEntry],
	target: 'node',
	output: serverOutput,
	mode: webpackEnv,
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				query: {
					presets: ['es2015', 'env', 'react', 'stage-0']
				}
			}
		]
	},
	plugins: [
		new HardSourcePlugin()
	]
}
let alias = {
	Actions: __dirname+'/src/shared/actions/',
	Containers: __dirname+'/src/shared/containers/',
	Components: __dirname+'/src/shared/components/',
	Utils: __dirname+'/src/shared/utils/',
	Shared: __dirname+'/src/shared/',
	Auth: __dirname+'/src/shared/auth/',
	Classes: __dirname+'/src/shared/classes/',
	Config: __dirname+'/src/shared/config/',
	Redux: __dirname+'/src/shared/redux/'
};
server.resolve = {
	alias
};
client.resolve = {
	alias
};

module.exports = [client, server];
