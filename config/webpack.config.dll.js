const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');


const untrackedDeps = [];

const deps = [
	...Object.keys(require(paths.appPackageJson).dependencies),
].filter((elem) => (untrackedDeps.indexOf(elem) === -1));


module.exports = {
	mode: 'none',
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.less',
			'.scss',
			'.sass',
			'.css',
		],
		modules: [
			'node_modules',
		],
	},
	entry: {
		dllLib: deps,
	},
	output: {
		filename: 'bundle.dll.js',
		path: path.join(paths.appPublic, 'dll'),
		library: '[name]',
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.join(paths.appPublic, 'dll', 'manifest.dll.json'),
		}),
	],
};
