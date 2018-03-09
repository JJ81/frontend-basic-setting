const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins


module.exports = {
	entry: './assets/javascript/index.js',
	output: {
		path:__dirname+ '/dist/',
		filename: "bundle.min.js",
		publicPath: '/'
	},
	devServer: {
		inline: false,
		contentBase: "./dist",
	},
	module: {
		noParse: /jquery|lodash/,
		rules: [
			{
				test: /\.js?$/,
				exclude:/(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'es2016']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ mingle : false}),
		new HtmlWebpackPlugin({template: 'index.html'})
	]
	
};