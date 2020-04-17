const APP_ROOT = process.cwd();
const path = require('path');
const IS_SERVER = process.env.TARGET_ENV === 'node';

module.exports = {
	testEnvironment: IS_SERVER ? 'node' : 'jsdom',
	setupFiles: [
		path.resolve(APP_ROOT, 'tests/setup.js'),
	],
	/**
	 * 匹配相关
	 */
	moduleFileExtensions: [
		'js',
		'jsx',
		'json',
		'md'
	],
	// 匹配规则很重要，不声明rootDir，需要改成path.resolve(APP_ROOT, 'tests')
	rootDir: process.cwd(),
	roots: [
		'tests',
		'src'
	],
	// modulePathIgnorePatterns 与 testPathIgnorePatterns相似
	modulePathIgnorePatterns: [
	],
	testPathIgnorePatterns: [
		'/node_modules/'
	],
	testRegex: '.*\\.test\\.js$',
	/**
	 * 覆盖率相关
	 * 暂时需要发包，设置为false
	 */
	collectCoverage: false,
	coverageDirectory: `tests/coverage/${process.env.TARGET_ENV}`,
	// 检测src[js|jsx]是否都写了test用例
	collectCoverageFrom: [
		'src/**/*.{js,jsx}'
	],
	coverageThreshold: {
		"global": {
			"branches": IS_SERVER ? 0 : 95,
			"functions": IS_SERVER ? 0 : 95,
			"lines": IS_SERVER ? 0 : 95,
			"statements": IS_SERVER ? 0 : 95,
		}
	},
	/**
	 * 解析相关相关
	 */
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'/dist/',
		'/node_modules/',
		// Ignore modules without es dir
		// 'node_modules\/[^/]+?\/(?!(es|node_modules)\/)',
	],
	globals: {}
};
