/**
 *做一个约定，设置缓存的时候类型为：Object
 *否则要改写JSON.stringify和JSON.parse做判断
 */


/**
 * 设置cookie
 * @param  key
 * @param  val
 * @param  days   时间：默认12小时、，单位：天
 * @param  path   域名下的路径：默认：/
 * @param  domain 域名
 */
export const setCookie = (key, val, days, path, domain, opts = {}) => {
	let expire = new Date();
	expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 0.5 * 24 * 60 * 60 * 1000)); // 默认12小时
	document.cookie = key + '=' + encodeURIComponent(JSON.stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
};
/**
 * 删除cookie
 */
export const delCookie = (key, path, domain, opts = {}) => {
	let expires = new Date(0);
	document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
};
/**
 * 获取cookie
 */
export const getCookie = (key, opts = {}) => {
	let r = new RegExp("(?:^|;+|\\s+)" + key + "=([^;]*)");
	let m = window.document.cookie.match(r);
	return (!m ? null : JSON.parse(decodeURIComponent(m[1])));
};

/**
 *做一个约定，设置缓存的时候类型为：Object
 *否则要改写JSON.stringify和JSON.parse做判断
 */

/**
 * 判断是否可以进行localStorage
 */
const isAvailable = (() => {
	const test = 'test';
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
})();
/**
 * 设置缓存
 * @param key 保存的键值
 * @param val 保存的内容
 */
export const setItem = (key, val, type, opts = {}) => {
	val = JSON.stringify(val);
	if (isAvailable) {
		let fn = type === 'session' ? sessionStorage : localStorage;
		fn.setItem(key, val);
	}
};
/**
 * 获取缓存
 * @param  {[String]} key 获取的键值
 * @return {Object}
 */
export const getItem = (key, type, opts = {}) => {
	if (isAvailable) {
		let fn = type === 'session' ? sessionStorage : localStorage;
		return fn.getItem(key) && JSON.parse(fn.getItem(key));
	}
};
/**
 * 删除缓存
 * @param  {[String]} key 删除的键值
 */
export const delItem = (key, type, opts = {}) => {
	if (isAvailable) {
		let fn = type === 'session' ? sessionStorage : localStorage;
		fn.removeItem(key);
	}
};
