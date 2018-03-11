process.env.NODE_ENV = 'production';
const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { APP_ROOT, commonConfig, localIp, localPort, libName } = require('./webpack.config.common');

let distConfig = {
	entry: {
		main: path.resolve(APP_ROOT, `src/main.js`)
	},
	output: {
		path: path.resolve(APP_ROOT, 'dist'),
		filename: `${libName}.min.js`,
		libraryTarget: 'umd',
		/**
		 * html引用路径
		 * publicPath: ENV_IS_DEV ? './' : 'https://cdn.example.com/'
		 */
		publicPath: '/'
	},
	plugins: [
		/**
		 * 生产环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
		/**
		 * webpack3.x 模块串联
		 */
		new webpack.optimize.ModuleConcatenationPlugin()
	],
};

let demoConfig = {
	entry: {
		main: path.resolve(APP_ROOT, `examples/main.js`)
	},
	output: {
		path: path.resolve(APP_ROOT, 'demo'),
		filename: '[name].[hash:8].bundle.js',
		libraryTarget: 'umd',
		/**
		 * html引用路径
		 * publicPath: ENV_IS_DEV ? './' : 'https://cdn.example.com/'
		 */
		publicPath: '/wya-utils/demo'
	},
	plugins: [
		/**
		 * 输出html
		 */
		new HtmlWebpackPlugin({
			template: path.resolve(APP_ROOT, 'examples/index.tpl.html'),
			chunks: ['main'], // 当前路由所包含的模块，注意common引入方式
			inject: 'body',
			filename: 'index.html'
		}),
		/**
		 * 生产环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
		/**
		 * webpack3.x 模块串联
		 */
		new webpack.optimize.ModuleConcatenationPlugin()
	],
};

module.exports = [ 
	webpackMerge( commonConfig, distConfig ),
	webpackMerge( commonConfig, demoConfig ),
];