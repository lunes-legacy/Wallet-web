module.exports = {
	mode: 'development',
	entry: ['babel-polyfill', './tests/index.js'],
	target: 'node',
	output: {
		filename: 'test.bundle.js',
		path: __dirname+'/tests/bundle/',
		libraryTarget: 'commonjs2'
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
		}
	}
};