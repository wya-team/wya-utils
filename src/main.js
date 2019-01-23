/**
 * 工具方法
 */


/**
 *做一个约定，设置缓存的时候类型为：Object
 *否则要改写JSON.stringify和JSON.parse做判断
 */
/* Cookie*/
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
export const getDevice = (opts = {}) => {
	const device = {};
	const ua = navigator.userAgent;

	const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

	device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

	// Android
	if (android) {
		device.os = 'android';
		device.osVersion = android[2];
		device.android = true;
		device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
	}
	if (ipad || iphone || ipod) {
		device.os = 'ios';
		device.ios = true;
	}
	// iOS
	if (iphone && !ipod) {
		device.osVersion = iphone[2].replace(/_/g, '.');
		device.iphone = true;
	}
	if (ipad) {
		device.osVersion = ipad[2].replace(/_/g, '.');
		device.ipad = true;
	}
	if (ipod) {
		device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
		device.iphone = true;
	}
	// iOS 8+ changed UA
	if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
		if (device.osVersion.split('.')[0] === '10') {
			device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
		}
	}
	// Webview
	device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
	// keng..
	device.weixin = /MicroMessenger/i.test(ua);
	// pc or touch
	device.touch = (device.android || device.ios) ? true : false;
	return device;
};
export const device = getDevice();
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
				|| value > Number.MAX_SAFE_INTEGE
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

/* 验证数据*/
export let objRegex = {
	validNum: {
		regex: /^\d+(\.\d+)?$/,
		error: "请输入正确数字"
	},
	validInteger: {
		regex: /^[1-9]\d*$/,
		error: "请输入非负整数"
	},
	validEmail: {
		regex: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
		error: "邮箱格式不正确"
	},
	validDate: {
		regex: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
		error: "日期格式不正确"
	},
	validTime: {
		regex: /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/,
		error: "时间格式不正确"
	},
	validId: {
		// regex: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
		regex: /(^[0-9a-zA-Z]{6,}$)/, // 港澳台比较特殊
		error: "身份证格式不正确"
	},
	validPrice: {
		// regex: /^([+-]?[1-9][\d]{0,3}|0)([.]?[\d]{1,2})?$/,
		regex: /^([1-9][\d]{0,10}|0)([.]?[\d]{1,2})?$/,
		error: "请输入正确金额"
	},
	validMobile: {
		regex: /^(13[0-9]|14[5|7]|15[^4|^\D]|17[0-9]|19[8|9]|166|18[0-9])\d{8}$/,
		// regex: /^\d+(\.\d+)?$/,
		error: "请填写正确的手机号码"
	},
	validPhone: {
		regex: /^0[1-9][0-9]{1,2}-[2-8][0-9]{6,7}$/,
		error: "请填写正确的电话号码"
	},
	validPostalCode: {
		regex: /^\d{4}$/,
		error: "请输入4位短信验证码"
	},
	validZipCode: {
		regex: /^\d{6}$/,
		error: "请输入6位邮政编码"
	},
	validWeChat: {
		regex: /^[a-zA-Z\d_-]{5,}$/,
		error: "请输入正确的微信号"
	},
	validName: {
		regex: /^[A-Za-z0-9\u4e00-\u9fa5_-]{1,}$/,
		error: "请不要输入特殊字符"
	}
};
export const changeObjRegex = (rule = {}, opts = {}) => {
	// 验证传入 todo
	// ...
	objRegex = {
		...objRegex,
		...rule
	};
};
/**
 * 验证数据
 * @param  {String} rule 规则
 * @param  {String} value 校正的value
 * @param  {String} callback 回调报错
 * @return {String}
 */
export const dataValidity = (rule, value, callback, opts = {}) => {
	let error;
	if (typeof value === 'string') {
		value = value.trim();
	}
	if (rule.required && !value) {
		error = rule.name + "必填";
		callback(error);
		return false;
	}
	let rules = rule.type instanceof Array ? rule.type : [rule.type];

	for (let i = 0; i < rules.length; i++) {
		let type = rules[i];
		let val = value;
		if (type == 'validMobile') {
			val = val || '';
			val = val.replace(/\s/g, '');
		}

		if (objRegex[type] && val && !objRegex[type].regex.test(val)) {
			error = objRegex[type].error;
			rules.length - 1 == i && callback(error);
		} else {
			callback();
			break;
		}
	}
	
};

/**
 * canvas
 */
export const getCroppedImg = (canvas, fileName = '____fileName', getFile = false, opts = {}) => {
	// As base64
	const base64Image = canvas.toDataURL("image/png");
	// As a blob 移动端不兼容
	return new Promise((resolve, reject) => {
		let file;
		if (getFile) {
			let arr = base64Image.split(',');
			let mime = arr[0].match(/:(.*?);/)[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--){
			    u8arr[n] = bstr.charCodeAt(n);
			}
			file = new Blob([u8arr], { type: mime });
			file.name = fileName;
		}
		resolve({ file, base64Image });
	});
};
/**
 * [description]
 */
export const defineProperty = (obj, key, value, opts = {}) => {
	const {
		writable = true,
		enumerable = true,
		configurable = true,
		...rest
	} = opts;
	const descriptor = {
		...rest,
		writable,
		enumerable,
		configurable,
		value
	};

	return Object.defineProperty(obj, key, descriptor);
};

/**
 * 输入金额
 */
export const getFormatInputMoney = (string, opts = {}) => {
	if (!string) {
		string = '0.00';
	}
	let value = string;
	value = value.replace(/[^\d.]/g, "");  // 清除“数字”和“.”以外的字符
	value = value.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的
	value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入两个小数
	if (value.indexOf(".") < 0 && value != ""){ // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
		value = parseFloat(value);
	}
	return value;
};
/**
 * 浮点数计算 加法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const accAdd = (arg1, arg2, opts = {}) => {
	let r1, r2, m, c;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		let cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return (arg1 + arg2) / m;
};

/**
 * 浮点数计算 减法
 * @param arg1
 * @param arg2
 * @returns {string}
 */
export const accSub = (arg1, arg2, opts = {}) => {
	let r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
/**
 * 浮点数计算 乘法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const accMul = (arg1, arg2, opts = {}) => {
	let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
/**
 * 浮点数计算 除法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const accDiv = (arg1, arg2, opts = {}) => {
	let t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {
	}

	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	return (r1 / r2) * Math.pow(10, t2 - t1);
};
/**
 * 针对以上加减乘除
 * 支持链式调用
 * Acc(a).add(1).add(2)
 * class -> babel 
 */

export const acc = value => {
	class Acc {
		constructor(val) {
			this.result = val;
		}
		add(val) {
			this.result = accAdd(this.result, val);
			return this;
		}
		sub(val, isExchange) {
			this.result = isExchange 
				? accSub(this.result, val)
				: accSub(val, this.result);
			return this;
		}
		mul(val) {
			this.result = accMul(this.result, val);
			return this;
		}
		div(val, isExchange) {
			this.result = isExchange 
				? accDiv(this.result, val)
				: accDiv(val, this.result);
			return this;
		}
		val() {
			let _value = this.result;
			if (typeof _value === 'object') {
				throw new TypeError('参数错误');
				return 0;
			}
			return _value || 0;
		}
	}
	return new Acc(value);
};
/**
 * 原型合并或者多(合并)继承
 */
const copyProperties = (target, source) => {
	for (let key of Reflect.ownKeys(source)) {
		if ( key !== "constructor"
			&& key !== "prototype"
			&& key !== "name"
		) {
			let desc = Object.getOwnPropertyDescriptor(source, key);
			Object.defineProperty(target, key, desc);
		}
	}
};
// 用于class
// class xxx extends mixins(a, b, c) {}
export const mixins = (...mixins) => {
	class Mix {}

	for (let mixin of mixins) {
		copyProperties(Mix, mixin); // 拷贝实例属性
		copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
	}

	return Mix;
};
// 用于对象 
// @createMixins({})
// class {}
export const createMixins = (...mixins) => target => {
	Object.assign(target.prototype, ...mixins);
};



/**
 * 用word方式计算正文字数
 * @param str 
 */
export const getCpmisWords = (str) => {
	let sLen = 0;
	try {
		// 先将回车换行符做特殊处理
		str = str.replace(/(\r\n+|\s+|　+)/g, "龘");
		// 处理英文字符数字，连续字母、数字、英文符号视为一个单词
		str = str.replace(/[\x00-\xff]/g, "m");
		// 合并字符m，连续字母、数字、英文符号视为一个单词
		str = str.replace(/m+/g, "*");
		// 去掉回车换行符
		str = str.replace(/龘+/g, "");
		// 返回字数
		sLen = str.length;
	} catch (e){

	}
	return sLen;
};
