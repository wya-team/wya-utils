import { IS_SERVER } from './helper';

class DeviceManager {
	constructor() {
		this.reset();
	}

	_restoreDefault() {
		this.ios = false;
		this.android = false;
		this.iphone = false;
		this.ipad = false;
		this.androidChrome = false;

		this.os = '';
		this.osVersion = '';
		this.osVersion = '';

		this.wechat = false;
		this.wechatDevTools = false;
		this.wechatVersion = '';

		this.webView = false;
		this.touch = false;

		this.firefox = false;
	}

	reset(opts = {}) {
		this._restoreDefault();

		const ua = IS_SERVER || opts.userAgent 
			? (opts.userAgent || '') 
			: navigator.userAgent;

		const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
		const wechatDevTools = ua.match(/wechatdevtools/);

		// Android
		if (android) {
			this.os = 'android';
			this.osVersion = android[2];
			this.android = true;
			this.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
		}
		if (ipad || iphone || ipod) {
			this.os = 'ios';
			this.ios = true;
		}
		// iOS
		if (iphone && !ipod) {
			this.osVersion = iphone[2].replace(/_/g, '.');
			this.iphone = true;
		}
		if (ipad) {
			this.osVersion = ipad[2].replace(/_/g, '.');
			this.ipad = true;
		}
		if (ipod) {
			this.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
			this.iphone = true;
		}
		// iOS 8+ changed UA, 暂时不需要
		// if (this.ios && this.osVersion && ua.indexOf('Version/') >= 0) {
		// 	if (this.osVersion.split('.')[0] === '10') {
		// 		this.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
		// 	}
		// }
		// 
		// Webview
		this.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

		// wechat
		this.wechat = /MicroMessenger/i.test(ua);
		this.wechatVersion = (ua.match(/MicroMessenger\/([\d\.]+)/i) || [])[1];
		// wechatDevTools
		this.wechatDevTools = /wechatdevtools/.test(ua);

		// pc or touch
		this.touch = (this.android || this.ios) ? true : false;

		// firefox
		this.firefox = ua.toLowerCase().indexOf('firefox') > -1;

		return this;
	}
}
export const Device = new DeviceManager;