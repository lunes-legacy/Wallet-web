const HardSourcePlugin = require('hard-source-webpack-plugin');

let client = {
	entry: __dirname+'/src/client/index.js',
	output: {
		path: __dirname+'/public/',
		filename: 'bundle.js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	plugins: [
		new HardSourcePlugin()
	]
};

let server = {
	entry: __dirname+'/src/server/index.js',
	target: 'node',
	output: {
		path: __dirname+'/src/server/bundle/',
		filename: 'index.bundle.js',
		libraryTarget: 'commonjs2'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				query: {
					presets: ['es2015', 'react']
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
	Reducers: __dirname+'/src/shared/reducers',
	Containers: __dirname+'/src/shared/containers/',
	Components: __dirname+'/src/shared/components/',
	Stores: __dirname+'/src/shared/stores',
	Utils: __dirname+'/src/shared/utils'
};
server.resolve = {
	alias
};
client.resolve = {
	alias
};

module.exports = [client, server];