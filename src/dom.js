
const $target = document.createElement('div').style;
const prefix = (() => {
	let keys = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	};

	let values = {
		webkit: '-webkit-',
		Moz: '-moz-',
		O: '-o-',
		ms: '-ms-',
		standard: ''
	};

	for (let key in keys) {
		if ($target[keys[key]] !== undefined) {
			return {
				camel: key,
				kebab: values[key]
			};
		}
	}

	return false;
})();

/**
 * 可做一些兼容处理
 */
class Manager {
	static on(el, event, handler) { 
	}
	static off(el, event, handler) { 
	}
	static once(el, event, handler) { 
	}

	static prefixStyle(v) {
		
		if (prefix === false || prefix === 'standard') {
			!prefix && console.log('@wya/utils: 不支持style fix');
			return {
				camel: v,
				kebab: v
			};
		}

		return {
			camel: prefix.camel + v.charAt(0).toUpperCase() + v.substr(1),
			kebab: prefix.kebab + v
		};
	}

	static hasClass(el, cls) {
		if (!el || !cls) return false;
		if (cls.includes(' ')) {
			throw new Error('@wya/utils: 类名不应该包含空格');
		};
		if (el.classList) {
			return el.classList.contains(cls);
		} else {
			return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}
	}

	static addClass(el, cls) {
		if (!el) return;
		let curClass = el.className;
		let classes = (cls || '').split(' ');

		for (let i = 0, j = classes.length; i < j; i++) {
			let clsName = classes[i];
			if (clsName) {
				if (el.classList) {
					el.classList.add(clsName);
				} else if (!Manager.hasClass(el, clsName)) {
					curClass += ' ' + clsName;
				}
			}
		}
		if (!el.classList) {
			el.className = curClass;
		}
	}
	static removeClass(el, cls) {
		if (!el || !cls) return;
		let classes = cls.split(' ');
		let curClass = ' ' + el.className + ' ';

		for (let i = 0, j = classes.length; i < j; i++) {
			let clsName = classes[i];
			if (clsName) {
				if (el.classList) {
					el.classList.remove(clsName);
				} else if (Manager.hasClass(el, clsName)) {
					curClass = curClass.replace(' ' + clsName + ' ', ' ');
				}
			}
		}
		if (!el.classList) {
			el.className = trim(curClass);
		}
	}
};
export const Dom = Manager;