const APP_ROOT = process.cwd();
const path = require('path');

module.exports = (api) => {
	// 编译缓存
	api.cache.forever();

	return {
		compact: false,
		presets: [
			"@babel/preset-env"
		],
		plugins: [
			"@babel/plugin-proposal-export-namespace-from",
			"@babel/plugin-proposal-export-default-from",
			"@babel/plugin-proposal-function-bind",
			"@babel/plugin-syntax-dynamic-import",
			"@babel/plugin-transform-runtime",
			["@babel/plugin-proposal-decorators", { legacy: true }],
			[
				"@babel/plugin-proposal-class-properties",
				{
					"assumptions": {
						"setPublicClassFields": true
					}
				}
			],
		]
	};
};
