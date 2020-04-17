import FakeStorage from './fake-storage';
import { PREFIX_NAME, ENV_IS_DEV, formatKey } from './helper';
import { IS_SERVER } from '../helper';

const STORAGE_PERMISSION_ALLOW = (() => {
	if (IS_SERVER) return false;
	const test = 'test';
	try {
		window.localStorage.setItem(test, test);
		window.localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
})();

export default class StorageManager {
	constructor() {
		this.sessionStorage = new FakeStorage();
		this.localStorage = new FakeStorage();
	}

	getInvoke(opts = {}) {
		return opts.session 
			? 'sessionStorage' 
			: 'localStorage';
	}

	setVersion(version, clear, opts = {}) {
		if (IS_SERVER) return null;

		this.version = version;

		if (!STORAGE_PERMISSION_ALLOW) return;
		// 清除之前的缓存
		Object.keys(window.localStorage).forEach((item) => {
			if (
				item.includes(PREFIX_NAME) 
				&& !item.includes(`${PREFIX_NAME}${version}`)
			) {
				window.localStorage.removeItem(item);
			}
		});
	}
	/**
	 * 设置缓存
	 * @param key 保存的键值
	 * @param val 保存的内容
	 */
	set(key, val, opts = {}) {
		if (IS_SERVER) return;
		let invoke = this.getInvoke(opts);

		key = formatKey(key, this.version);
		val = typeof val === 'string' ? val : JSON.stringify(val);

		try {
			window[invoke].setItem(key, val);
		} catch (error) {
			this[invoke].setItem(key, val);

			// 表示有异常， 此处不用throw
			return error;
		}
	}
	/**
	 * 获取缓存
	 * @param  {[String]} key 获取的键值
	 * @return {Object}
	 */
	get(key, opts = {}) {
		if (IS_SERVER) return null;

		let invoke = this.getInvoke(opts);
		let val = null;
		key = formatKey(key, this.version);
		
		try {
			val = this[invoke].getItem(key) || window[invoke].getItem(key);
			val = JSON.parse(val);
			// 避免string套string, 暂时处理，可考虑while
			val = typeof val === 'string' ? JSON.parse(val) : val;
		} catch (e) {
			ENV_IS_DEV && console.error('@wya/utils: 建议使用json');
		}
		return val;
	}
	/**
	 * 删除缓存
	 * @param  {[String]} key 删除的键值
	 */
	remove(key, opts = {}) {
		if (IS_SERVER) return;

		let invoke = this.getInvoke(opts);
		
		this[invoke].removeItem(key); 
		try {
			// 此处调用两次api
			window[invoke].removeItem(key); 
			window[invoke].removeItem(formatKey(key, this.version));
		} catch (e) {
			console.error(e);
		}
	}
}