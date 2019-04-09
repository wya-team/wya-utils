/**
 * 输入金额
 */
export const formatMoney = (string, opts = {}) => {
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
 * 二进制求和值转数组
 */
export const sum2array = (value) => {
	return parseInt(value).toString(2).split('').reduce((pre, cur, index, source) => {
		+cur && pre.unshift(
			Math.pow(2, source.length - index - 1)
		);
		return pre;
	}, []);
};
