
class Manager {
	constructor() {
		this.cssCodeArr = [];
		this.cssArr = [];
		this.jsArr = [];
	}
	/**
	 * style in js
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
	 */	
	css(url, opts = {}) {
		if (this.cssArr.includes(url)) return;
		this.cssArr.push(url);

		return new Promise((resolve, reject) => { 
			let link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			link.onload = () => {
				resolve();
			};
			link.onerror = () => {
				reject();
				this.cssArr.filter(i !== url);
			};

			document.getElementsByTagName("head")[0].appendChild(link);
		});
		
	}

	/**
	 * inject js
	 */
	js(url, opts = {}) {
		if (this.jsArr.includes(url)) return;

		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = url;
			script.onload = () => {
				resolve();
			};
			script.onerror = () => {
				reject();
				this.jsArr.filter(i !== url);
			};
			document.getElementsByTagName("head")[0].appendChild(script);
		});
	}
};
export const Load = new Manager();