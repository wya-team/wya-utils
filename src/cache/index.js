import StorageManager from './storage';
import CookieManager from './cookie';

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

export const Storage = new CacheStore( new StorageManager() );
export const Cookie = new CacheStore( new CookieManager() );
