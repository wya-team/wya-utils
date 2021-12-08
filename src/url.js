
import { IS_SERVER } from './helper';

/**
 * 目前只处理整数(订单编号会超过这个长度，一般不会)，小数点暂不处理
 * @param {*} val 
 */
const parseQuery = (val) => {
	let regex = /^\d+$/;
	// 数字字符串长度超过17，JSON.parse()会将后面的数组变成0
	if (regex.test(val) && val.length >= 16) {
		return val;
	}
	return JSON.parse(val);
};

class URLManager {
	/**
	 * 创建新的url
	 */
	static merge = (route, opts = {}) => {
		const {
			path, // ['', 'sd']
			query
		} = route;
		let result = path instanceof Array 
			? path.join('/')
			: path;

		let queryArr = [];
		for (let key in query) {
			if (query[key] || query[key] === false || query[key] === 0) { // 过滤掉值为null,undefined,''情况
				queryArr = [...queryArr, `${key}=${encodeURIComponent(query[key])}`];
			}
		}

		if (queryArr.length > 0) {
			result += (result.indexOf('?') > -1 ? '&' : '?') + queryArr.join('&');
		}
		return result;
	};
	/**
	 * 解析url
	 * @param  {String} url
	 * @return {Object}
	 */	
	static parse = (url, opts = {}) => {
		if (IS_SERVER) return { path: [], query: {} };
		// TODO: 使用 new window.URL(url);
		url = url || `${location.pathname}${location.search}`;
		let path = [];
		const query = {};
		// const urlArr = url.replace('/', '').split('?');
		const urlArr = url.split('?');
		path = urlArr[0].split('/');

		if (urlArr.length > 1) {
			urlArr[1].split('&').forEach(str => {
				const arr = str.split('=');
				const key = arr[0];
				const value = decodeURIComponent(arr[1]);
				// 009, ''
				if (
					isNaN(value) 
					|| value[0] === '0' 
					|| value === '' 
					|| value > Number.MAX_SAFE_INTEGER
				) {
					query[key] = value;
				} else {
					query[key] = Number(value);
				}
			});
		}

		return {
			path,
			query
		};
	};
	static get = (key, url, opts = {}) => {
		if (IS_SERVER) return;
		url = url 
			? url.substring(url.indexOf('?')) 
			: window.location.search;

		let regExp = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		let val = decodeURIComponent(url).substr(1).match(regExp);

		val = val != null ? decodeURIComponent(val[2]) : null;

		try {
			val = parseQuery(val);
			// 避免string套string, 暂时处理，可考虑while
			val = typeof val === 'string' ? parseQuery(val) : val;
		} catch (e) {
		}
		return val;
	};
};
export const URL = URLManager;