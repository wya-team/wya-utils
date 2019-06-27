const ENV_IS_DEV = process.env.NODE_ENV === "development";

/**
 * 工厂提供者
 */
class CacheStore {
	constructor(factory) {
		this.factory = factory;
	}
	setVersion(...rest) {
		return this.factory.setVersion(...rest);
	}
	get(...rest) {
		return this.factory.get(...rest);
	}
	set(...rest) {
		return this.factory.set(...rest);
	}
	remove(...rest) {
		return this.factory.remove(...rest);
	}
}

class StorageManager {
	constructor() {
		this.isAvailable = (() => {
			const test = 'test';
			try {
				localStorage.setItem(test, test);
				localStorage.removeItem(test);
				return true;
			} catch (e) {
				return false;
			}
		})();
	}
	setVersion(version, clear, opts = {}) {
		this.version = version;
		// todo 清理之前内容
	}
	/**
	 * 设置缓存
	 * @param key 保存的键值
	 * @param val 保存的内容
	 */
	set(key, val, opts = {}) {
		const { session } = opts;
		val = typeof val === 'string' ? val : JSON.stringify(val);
		if (this.isAvailable) {
			let fn = session ? sessionStorage : localStorage;
			fn.setItem(key, val);
		}
	}
	/**
	 * 获取缓存
	 * @param  {[String]} key 获取的键值
	 * @return {Object}
	 */
	get(key, opts = {}) {
		if (this.isAvailable) {
			const { session } = opts;
			let fn = session ? sessionStorage : localStorage;
			let val = fn.getItem(key);
			try {
				val = JSON.parse(val);
				// 避免string套string, 暂时处理，可考虑while
				val = typeof val === 'string' ? JSON.parse(val) : val;
			} catch (e) {
				ENV_IS_DEV && console.error('@wya/utils: 建议使用json');
			}
			return val;
		}
	}
	/**
	 * 删除缓存
	 * @param  {[String]} key 删除的键值
	 */
	remove(key, opts = {}) {
		if (this.isAvailable) {
			const { session } = opts;
			let fn = session ? sessionStorage : localStorage;
			fn.removeItem(key);
		}
	}
}

class CookieManager {
	constructor() {
		this.version = '';
	}
	setVersion(version, clear, opts = {}) {
		this.version = version;
		// todo 清理之前内容
	}
	/**
	 * 设置cookie
	 * @param  key
	 * @param  val
	 * @param  days   时间：默认12小时、，单位：天
	 * @param  path   域名下的路径：默认：/
	 * @param  domain 域名
	 */
	get(key, opts = {}) {
		let r = new RegExp("(?:^|;+|\\s+)" + key + "=([^;]*)");
		let m = window.document.cookie.match(r);
		let val = !m ? null : decodeURIComponent(m[1]);

		try {
			val = JSON.parse(val);
			// 避免string套string, 暂时处理，可考虑while
			val = typeof val === 'string' ? JSON.parse(val) : val;
		} catch (e) {
			ENV_IS_DEV && console.error('@wya/utils: 建议使用json');
		}
		return val;
	}
	set(key, val, opts = {}) {
		let { days, path, domain } = opts; 
		let expire = new Date();
		expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 0.5 * 24 * 60 * 60 * 1000)); // 默认12小时

		val = typeof val === 'string' ? val : JSON.stringify(val);
		document.cookie = `${key}=${encodeURIComponent(val)};expires=${expire.toGMTString()};path=${path ? path : '/'};${domain ? `domain=${domain};` : ''}`;
	}
	remove(key, opts = {}) {
		let { path, domain } = opts; 
		let expires = new Date(0);
		document.cookie = `${key}=;expires=${expires.toUTCString()};path=${(path ? path : '/')};${domain ? `domain=${domain};` : ''}`;
	}
}

export const Storage = new CacheStore( new StorageManager() );
export const Cookie = new CacheStore( new CookieManager() );
