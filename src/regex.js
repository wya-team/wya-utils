import { REGEX_RULES } from './_constants';

const format = (rules = {}) => {
	return Object.keys(rules).reduce((pre, cur) => {
		pre[cur] = rules[cur].value;
		pre[`${cur}Msg`] = rules[cur].msg;
		return pre;
	}, {});
};

class Manager {
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
	async validator(rule, value, callback, opts = {}) {
		try {
			let errorMsg;
			if (typeof value === 'string') {
				value = value.trim();
			}
			// TODO: 看业务需要是否处理成Promise
			let required = typeof rule.required === 'function'
				? await rule.required()
				: rule.required;

			if ( required && !value ) {
				errorMsg = `${rule.name || ''}必填`;
				callback(errorMsg);
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

				// TODO: 看业务需要是否处理成Promise
				let isError = typeof type === 'function' 
					? await type()
					: this[type] && val && !this[type].test(val);

				if (type) {
					errorMsg = rule.message || rule.msg || this[`${type}Msg`];
					rules.length - 1 == i && callback(errorMsg);
				} else {
					callback();
					break;
				}
			}
		} catch (e) {
			callback(`验证有误`);
			console.error(`[@wya/utils - regex]: 验证有误`, e);
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

export const RegEx = new Manager(REGEX_RULES);