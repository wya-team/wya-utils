import { REGEX_RULES } from './_constants';

const format = (rules = {}) => {
	return Object.keys(rules).reduce((pre, cur) => {
		pre[cur] = rules[cur].value;
		pre[`${cur}Msg`] = rules[cur].msg;
		return pre;
	}, {});
};

class RegExManager {
	constructor(rules = {}) {
		this._generate(rules);

		this.validator = this.validator.bind(this);
	}
	set(key, rule) {
		if (typeof key === 'string') {
			this._generate({
				[key]: rule 
			});
		} else if (typeof key === 'object')  {
			this._generate(key);
		}
	}
	/**
	 * for async-validator
	 * rule: {
	 * 	name, // 用于提示必填
	 * 	type,
	 * 	required,
	 * 	message,
	 * 	msg,
	 * 	, // 依赖其他选项时
	 * }
	 */
	validator(rule, value, callback, opts = {}) {
		let errorMsg;
		let auto = true;

		if (typeof value === 'string') {
			value = value.trim();
		}

		let required = typeof rule.required === 'function'
			? (auto = !rule.required.length, rule.required(callback))
			: rule.required;

		if (required && (!value || (value instanceof Array && !value.length))) {
			errorMsg = `${rule.name || ''}必填`;
			auto && callback(errorMsg);
			return false;
		}
		let rules = rule.type instanceof Array ? rule.type : [rule.type];

		for (let i = 0; i < rules.length; i++) {
			let type = rules[i];
			let val = value;
			if (type == 'mobile') {
				val = val || '';
				val = val.replace(/\s/g, '');
			}

			let isError = typeof type === 'function' 
				? (auto = !type.length, !type(callback))
				: this[type] && val && !this[type].test(val);

			if (isError) {
				errorMsg = rule.message || rule.msg || this[`${type}Msg`];
				rules.length - 1 == i && auto && callback(errorMsg);
			} else {
				auto && callback();
				break;
			}
		}
	}
	_generate(rules) {
		let target = format(rules);
		for (let key in target) {
			this[key] = target[key];
		}
		return this;
	}
};

// {
// 	name,
// 	type,
// 	msg,
// 	required,
// 	validator: Regex.validator
// }

export const RegEx = new RegExManager(REGEX_RULES);