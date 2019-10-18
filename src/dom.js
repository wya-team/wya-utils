
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

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (
		window.webkitRequestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.msRequestAnimationFrame 
		|| (cb => window.setTimeout(cb, 1000 / 60))
	);
}

/**
 * 可做一些兼容处理
 * el 使用prototype, 不涉及el使用 static
 */
class DOMManager {
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

	/**
	 * hack event.composedPath
	 * touchevent.composedPath 在iOS10.x和iOS9.x上返回的是空数组
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

	constructor(el, opts = {}) {
		this.$el = el;
	}

	on(event, handler, opts = false) { 
		this.$el[events.add](events.prefix + event, handler, opts);

		return this;
	}

	off(event, handler, opts = false) { 
		this.$el[events.remove](events.prefix + event, handler, opts);

		return this;
	}

	once(event, handler, opts = false) { 
		let _this = this;
		let listener = function() {
			handler && handler.apply(this, arguments);
			_this.off(event, listener, opts);
		};
		this.on(event, listener, opts);

		return this;
	}

	hasClass(cls) {
		if (!cls) return false;

		let el = this.$el;
		if (cls.includes(' ')) {
			throw new Error('@wya/utils: 类名不应该包含空格');
		};
		if (el.classList) {
			return el.classList.contains(cls);
		} else {
			return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}
	}

	addClass(cls) {
		let el = this.$el;
		let curClass = el.className;
		let classes = (cls || '').split(' ');

		for (let i = 0, j = classes.length; i < j; i++) {
			let clsName = classes[i];
			if (clsName) {
				if (el.classList) {
					el.classList.add(clsName);
				} else if (!this.hasClass(clsName)) {
					curClass += ' ' + clsName;
				}
			}
		}
		if (!el.classList) {
			el.className = curClass;
		}

		return this;
	}

	removeClass(cls) {
		let el = this.$el;
		let classes = cls.split(' ');
		let curClass = ' ' + el.className + ' ';

		for (let i = 0, j = classes.length; i < j; i++) {
			let clsName = classes[i];
			if (clsName) {
				if (el.classList) {
					el.classList.remove(clsName);
				} else if (this.hasClass(clsName)) {
					curClass = curClass.replace(' ' + clsName + ' ', ' ');
				}
			}
		}
		if (!el.classList) {
			el.className = trim(curClass);
		}

		return this;
	}

	getStyle(name) {
		if (!name) return null;

		if (name === 'float') {
			name = 'cssFloat';
		}

		let el = this.$el;
		try {
			let computed = document.defaultView.getComputedStyle(el, '');
			return el.style[name] || computed ? computed[name] : null;
		} catch (e) {
			return el.style[name];
		}
	}

	setStyle(name, value) {
		if (!name) return this;

		let el = this.$el;
		if (typeof name === 'object') {
			for (let prop in name) {
				if (name.hasOwnProperty(prop)) {
					this.setStyle(prop, name[prop]);
				}
			}
		} else {
			el.style[name] = value;
		}

		return this;
	}

	isScroll(vertical) {
		let el = this.$el;

		let overflow = this.getStyle(`overflow-${vertical ? 'y' : 'x'}`);
		overflow = overflow || this.getStyle('overflow');
		return overflow.match(/(scroll|auto)/);
	}

	getScroller(vertical) {
		let parent = this.$el;
		while (parent) {
			if ([window, document, document.documentElement].includes(parent)) {
				return window;
			}
			let parent$ = new DOMManager(parent);
			if (parent$.isScroll(vertical)) {
				return parent;
			}
			parent = parent.parentNode;
		}

		return parent;
	}

	/**
	 * 与container.contains(el)不同
	 */
	contains(child) {
		if (!child) return false;

		let el = this.$el;
		let childRect = child.getBoundingClientRect();
		let elRect;

		if ([window, document, document.documentElement, null, undefined].includes(el)) {
			elRect = {
				top: 0,
				right: window.innerWidth,
				bottom: window.innerHeight,
				left: 0
			};
		} else {
			elRect = el.getBoundingClientRect();
		}

		return childRect.top < elRect.bottom &&
			childRect.bottom > elRect.top &&
			childRect.right > elRect.left &&
			childRect.left < elRect.right;
	}

	/**
	 * el 必须是滚动的(TODO: 使用getScroller获得滚动或使用scroller参数)
	 * TODO: 这个后续还需要优化
	 * https://github.com/yiminghe/dom-scroll-into-view
	 */
	scrollIntoView(opts = {}) {
		let el = this.$el;
		let { from = 0, to, duration = 300, onEnd, scroller } = opts;
		
		let difference = Math.abs(from - to);
		let step = Math.ceil(difference / duration * 50);

		function scroll(start, end, step) {
			if (start === end) {
				onEnd && onEnd();
				return;
			}

			let d = (start + step > end) ? end : start + step;
			if (start > end) {
				d = (start - step < end) ? end : start - step;
			}

			if (el === window) {
				window.scrollTo(d, d);
			} else {
				el.scrollTop = d;
			}
			window.requestAnimationFrame(() => scroll(d, end, step));
		}
		scroll(from, to, step);

		return this;
	}
};

const DOM = (el, opts = {}) => new DOMManager(el, opts);
DOM.fn = DOMManager.prototype;

DOM.prefixStyle = DOMManager.prefixStyle;
DOM.composedPath = DOMManager.composedPath;

// 简写
const $ = DOM;

export { DOM, $ };
