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

class StroageManager {
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
	setVersion(...rest) {
		this.version = version;
		// todo 清理之前内容
	}
	/**
	 * 设置缓存
	 * @param key 保存的键值
	 * @param val 保存的内容
	 */
	set(key, val, type, opts = {}) {
		val = JSON.stringify(val);
		if (this.isAvailable) {
			let fn = type === 'session' ? sessionStorage : localStorage;
			fn.setItem(key, val);
		}
	}
	/**
	 * 获取缓存
	 * @param  {[String]} key 获取的键值
	 * @return {Object}
	 */
	get(key, type, opts = {}) {
		if (this.isAvailable) {
			let fn = type === 'session' ? sessionStorage : localStorage;
			return fn.getItem(key) && JSON.parse(fn.getItem(key));
		}
	}
	/**
	 * 删除缓存
	 * @param  {[String]} key 删除的键值
	 */
	remove(key, type, opts = {}) {
		if (this.isAvailable) {
			let fn = type === 'session' ? sessionStorage : localStorage;
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
		return (!m ? null : JSON.parse(decodeURIComponent(m[1])));
	}
	set(key, val, days, path, domain, opts = {}) {
		let expire = new Date();
		expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 0.5 * 24 * 60 * 60 * 1000)); // 默认12小时
		document.cookie = key + '=' + encodeURIComponent(JSON.stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
	}
	remove(key, path, domain, opts = {}) {
		let expires = new Date(0);
		document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
	}
}

export const Stroage = new CacheStore( new StroageManager() );
export const Cookie = new CacheStore( new StroageManager() );

// 以上为工厂模式
// 
// 以下抽象工厂模式设计
// class AbstractCacheFactory {
// 	setVersion() {
// 	}
// 	get() {
// 	}
// 	set() {
// 	}
// 	remove() {
// 	}
// }
// 
// class CacheStore // 同上
// 
// 接口协议
// class CookieManager extends AbstractCacheFactory {
// 同上
// }
// class CookieManager extends AbstractCacheFactory {
// 同上
// }
