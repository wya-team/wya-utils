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
	 */
	validator(rule, value, callback, opts = {}) {
		let errorMsg;
		if (typeof value === 'string') {
			value = value.trim();
		}
		if (rule.required && !value) {
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

			if (this[type] && val && !this[type].test(val)) {
				errorMsg = rule.msg || this[`${type}Msg`];
				rules.length - 1 == i && callback(errorMsg);
			} else {
				callback();
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

export const RegEx = new Manager(REGEX_RULES);