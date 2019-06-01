
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
	static hasClass(el, cls) {
		if (!el || !cls) return false;
		if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
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