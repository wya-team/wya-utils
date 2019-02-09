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