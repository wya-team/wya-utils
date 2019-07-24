
const $target = document.createElement('div').style;
const PREFIX_STYLE = (() => {
	let rules = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	};

	for (let key in rules) {
		if ($target[rules[key]] !== undefined) {
			return key;
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

	static prefixStyle(style) {
		if (PREFIX_STYLE === false) {
			throw new Error('@wya/utils: 不支持style fix');
		}

		if (PREFIX_STYLE === 'standard') {
			return style;
		}

		return PREFIX_STYLE + style.charAt(0).toUpperCase() + style.substr(1);
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