/**
 * 全局变量
 */

global.IS_SERVER = typeof window === 'undefined';

global.wait = (s = 0.05, callback) => {
	return new Promise(resolve => setTimeout(() => {
		callback && callback();
		resolve();
	}, s * 1000));
};