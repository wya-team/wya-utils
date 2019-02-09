/**
 * 重构url
 * @param  {Object}
 * @return {String}
 */
export const getConstructUrl = (route, opts = {}) => { // 创建新的url
	const {
		path,
		query
	} = route;
	let result = path.join('/');
	let queryArr = [];
	if (query && typeof query === 'object') {
		queryArr = Object.keys(query).sort()
			.filter(key => query[key] !== null)
			.map(key => `${key}=${query[key]}`);
	}

	if (queryArr.length > 0) {
		result += `?${queryArr.join('&')}`;
	}

	return result;
};
/**
 * 解析url
 * @param  {String} url
 * @return {Object}
 */
export const getParseUrl = (url = `${location.pathname}${decodeURIComponent(location.search)}`, opts = {}) => { // 解析url
	let path = [];
	const query = {};
	// const urlArr = url.replace('/', '').split('?');
	const urlArr = url.split('?');
	path = urlArr[0].split('/');

	if (urlArr.length > 1) {
		urlArr[1].split('&').forEach(str => {
			const arr = str.split('=');
			const key = arr[0];
			const value = arr[1];
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
/**
 * 重构Url
 * @param  {[type]} paramObj url的参数对象
 * @param  {[type]} url      url
 * @return {[type]}          新的url
 */
export const getHashUrl = (url = '', paramObj, opts = {}) => {
	let paramArray = [];
	for (let key in paramObj) {
		if (paramObj[key] || paramObj[key] === false || paramObj[key] === 0) { // 过滤掉值为null,undefined,''情况
			paramArray = [...paramArray, `${key}=${encodeURIComponent(paramObj[key])}`];
		}
	}
	return `${url}?${paramArray.join('&')}`;
};
/**
 * 查找url中key的值
 * @param  {String} key
 * @param  {String} urlInfo
 * @return {String}
 */
export const getUrlParam = (key, urlInfo, opts = {}) => {
	let regExp = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	let url = urlInfo ? urlInfo.substring(urlInfo.indexOf('?')) : window.location.search;
	let value = decodeURI(url).substr(1).match(regExp);

	return value != null ? unescape(value[2]) : null;
};