/**
 * 小于10的数字前面加0
 */
export const preZero = (num) => {
	if (num < 10 && num > 0) {
		return "0" + num;
	} else if (num <= 0) {
		return '00';
	}
	return num;
};
/**
 * [description]
 */
export const def = (obj, key, val, enumerable) => {
	Object.defineProperty(obj, key, {
		value: val,
		enumerable: !!enumerable,
		writable: true,
		configurable: true
	});
};

export const isObj = target => typeof target === 'object';

/**
 * 判断是否存在
 */
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

/**
 * 深拷贝
 * TODO: Date,RegExp 对象
 */
let baseClone = (target, source) => {
	for (let k in source) {
		// 只拷贝实例属性，不进行原型的拷贝
		if (hasOwn(source, k)) {
			// 引用类型的数据单独处理, null -> object
			if (source[k] && typeof source[k] == 'object') {
				target[k] = Array.isArray(source[k]) ? [] : {};
				// 递归处理引用类型数据(利用引用处理)
				baseClone(target[k], source[k]);
			} else {
				// 值类型的数据直接进行拷贝
				target[k] = source[k];
			}
		}
	}
	return target;
};
export const cloneDeep = (source) => {
	return source && typeof source === 'object' 
		? baseClone(Array.isArray(source) ? [] : {}, source) 
		: source;
};
export const cloneDeepEasier = (source) => JSON.parse(JSON.stringify(source));