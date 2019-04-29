
class Manager {
	constructor() {
		this.cssCodeArr = [];
		this.sourceStatus = {};
	}
	/**
	 * style in js
	 * 同步
	 */
	cssCode(code, opts = {}) {
		if (this.cssCodeArr.includes(code)) return;
		this.cssCodeArr.push(code);

		const style = document.createElement('style');
		style.type = 'text/css';
		style.rel = 'stylesheet';
		try {
			style.innerHTML = code;
		} catch (ex) {
			style.styleSheet.cssText = code;
		}
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	/**
	 * css in js
	 * 异步
	 * async await
	 */	
	css(url, opts = {}) {
		let status = this.sourceStatus[url] || new Promise((resolve, reject) => { 
			let link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			link.onload = () => {
				resolve();
			};
			link.onerror = (e) => {
				reject();
				this.cssArr = this.cssArr.filter(i => i !== url);
				throw new Error(e);
			};

			document.getElementsByTagName("head")[0].appendChild(link);
		});
		
		return status;
	}

	/**
	 * inject js
	 * 异步
	 * async await
	 */
	js(url, opts = {}) {
		let status = this.sourceStatus[url] || new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = url;
			script.onload = () => {
				resolve();
			};
			script.onerror = (e) => {
				reject();
				this.jsArr = this.jsArr.filter(i => i !== url);
				throw new Error(e);
			};
			document.getElementsByTagName("head")[0].appendChild(script);
		});

		return status;
	}
};
export const Load = new Manager();