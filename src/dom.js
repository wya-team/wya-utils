
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

const events = (() => {
	let add;
	let remove;
	let prefix;
	if (document.addEventListener) {
		add = 'addEventListener';
		remove = 'removeEventListener';
		prefix = '';
	} else {
		add = 'attachEvent';
		remove = 'detachEvent';
		prefix = 'on';
	}

	return {
		add,
		remove,
		prefix
	};
})();

/**
 * 可做一些兼容处理
 */
class Manager {
	static on(el, event, handler, opts = false) { 
		el[events.add](events.prefix + event, handler, opts);
	}

	static off(el, event, handler, opts = false) { 
		el[events.remove](events.prefix + event, handler, opts);
	}

	static once(el, event, handler, opts = false) { 
		let listener = function() {
			handler && handler.apply(this, arguments);
			Manager.off(el, event, listener);
		};
		Manager.on(el, event, listener);
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

	static getStyle(el, name) {
		if (!el || !name) return null;
		if (name === 'float') {
			name = 'cssFloat';
		}

		try {
			let computed = document.defaultView.getComputedStyle(el, '');
			return el.style[name] || computed ? computed[name] : null;
		} catch (e) {
			return el.style[name];
		}
	}

	static setStyle(el, name, value) {
		if (!el || !name) return;

		if (typeof name === 'object') {
			for (let prop in name) {
				if (name.hasOwnProperty(prop)) {
					Manager.setStyle(el, prop, name[prop]);
				}
			}
		} else {
			el.style[name] = value;
		}
	}

	static isScroll(el, vertical) {
		let overflow = Manager.getStyle(el, `overflow-${vertical ? 'y' : 'x'}`);
		overflow = overflow || Manager.getStyle(el, 'overflow');
		return overflow.match(/(scroll|auto)/);
	}

	static getScroller(el, vertical) {
		let parent = el;
		while (parent) {
			if ([window, document, document.documentElement].includes(parent)) {
				return window;
			}
			if (Manager.isScroll(parent, vertical)) {
				return parent;
			}
			parent = parent.parentNode;
		}

		return parent;
	}

	/**
	 * 与container.contains(el)不同
	 */
	static contains(el, container) {
		if (!el || !container) return false;

		const elRect = el.getBoundingClientRect();
		let containerRect;

		if ([window, document, document.documentElement, null, undefined].includes(container)) {
			containerRect = {
				top: 0,
				right: window.innerWidth,
				bottom: window.innerHeight,
				left: 0
			};
		} else {
			containerRect = container.getBoundingClientRect();
		}

		return elRect.top < containerRect.bottom &&
			elRect.bottom > containerRect.top &&
			elRect.right > containerRect.left &&
			elRect.left < containerRect.right;
	}

	/**
	 * hack event.composedPath
	 * touchevent.composedPath 在ios10.0上返回的是空数组
	 * 跟默认的相比，少了window对象
	 */
	static composedPath(e) {
		let path = (e.composedPath && e.composedPath()) || [];
		if (path.length) return path;
		let parent = e.target.parentNode;
		while (parent) {
			path.push(parent);
			parent = parent.parentNode;
		}
		return path;
	}
};
export const Dom = Manager;