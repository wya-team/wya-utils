import { ENV_IS_DEV, formatKey } from './helper';
import { IS_SERVER } from '../helper';

export default class CookieManager {
	constructor() {
		this.version = '';
	}
	setVersion(version, clear, opts = {}) {
		if (IS_SERVER) return;

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
		if (IS_SERVER) return null;

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
		if (IS_SERVER) return;

		let { days, path, domain } = opts; 
		let expire = new Date();
		expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 0.5 * 24 * 60 * 60 * 1000)); // 默认12小时

		val = typeof val === 'string' ? val : JSON.stringify(val);
		document.cookie = `${key}=${encodeURIComponent(val)};expires=${expire.toGMTString()};path=${path ? path : '/'};${domain ? `domain=${domain};` : ''}`;
	}
	remove(key, opts = {}) {
		if (IS_SERVER) return;

		let { path, domain } = opts; 
		let expires = new Date(0);
		document.cookie = `${key}=;expires=${expires.toUTCString()};path=${(path ? path : '/')};${domain ? `domain=${domain};` : ''}`;
	}
}