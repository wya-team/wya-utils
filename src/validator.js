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