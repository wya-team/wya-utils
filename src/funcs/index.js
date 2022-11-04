import {
	getUid,
	preZero,
	def,
	isObj,
	hasOwn,
	cloneDeep,
	cloneDeepEasier
} from './assit';
import { createMixins } from './mixin';
import { formatMoney, sum2array, encrypt } from './format';
import { base642Blob, canvas2file, getWordsLength } from './other';

export const Utils = {
	getUid,
	preZero,
	def,
	isObj,
	hasOwn,
	cloneDeep,
	cloneDeepEasier,
	createMixins,
	formatMoney,
	sum2array,
	base642Blob,
	canvas2file,
	getWordsLength,
	encrypt,
	/**
	 * 扩展或重写
	 */
	set(key, method) {
		if (typeof key === 'string') {
			this[key] = method;
		} else if (typeof key === 'object')  {
			let target = key;
			for (let _ in target) {
				this[_] = target[_];
			}
		}
	}
};
