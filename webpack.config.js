const HardSourcePlugin = require('hard-source-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

let client = {
	target: 'web',
	entry: ['babel-polyfill',__dirname+'/src/client/index.js'],
	output: {
		path: __dirname+'/public/',
		filename: 'bundle.js'
	},
	node: {
		fs: 'empty'
	}, 
	mode: 'development',
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

let server = {
	entry: ['babel-polyfill',__dirname+'/src/server/index.js'],
	target: 'node',
	output: {
		path: __dirname+'/src/server/bundle/',
		filename: 'index.bundle.js',
		libraryTarget: 'commonjs2'
	},
	mode: 'development',
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
