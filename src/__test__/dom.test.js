import { DOM } from '..';

describe('dom.js', () => {
	test('验证api', () => {
		expect(typeof DOM).toBe('function');
		expect(typeof DOM.on).toBe('function');
		expect(typeof DOM.off).toBe('function');
		expect(typeof DOM.addClass).toBe('function');
		expect(typeof DOM.removeClass).toBe('function');
		expect(typeof DOM.hasClass).toBe('function');
		expect(typeof DOM.prefixStyle).toBe('function');
		expect(typeof DOM.getStyle).toBe('function');
		expect(typeof DOM.setStyle).toBe('function');
		expect(typeof DOM.isScroll).toBe('function');
		expect(typeof DOM.getScroller).toBe('function');
		expect(typeof DOM.contains).toBe('function');
		expect(typeof DOM.composedPath).toBe('function');
		expect(typeof DOM.scrollIntoView).toBe('function');
	});

	test('-> on/off', () => {
		let count = 0;
		let trigger = () => {
			let eventA = new KeyboardEvent('keydown', { 'keyCode': 65 });
			document.dispatchEvent(eventA);
		};

		let handler = (e) => {
			expect(e.keyCode).toBe(65);
			count++;
		};

		DOM.on(window.document, 'keydown', handler);
		trigger();
		expect(count).toBe(1);
		trigger();
		expect(count).toBe(2);


		DOM.off(window.document, 'keydown', handler);
		trigger();
		expect(count).toBe(2);
		trigger();
		expect(count).toBe(2);

		DOM.once(window.document, 'keydown', handler);

		trigger();
		expect(count).toBe(3);
		trigger();
		expect(count).toBe(3);
	});

	test('-> prefixStyle', () => {
		expect(DOM.prefixStyle('transform').camel).toBe('webkitTransform');
		expect(DOM.prefixStyle('transform').kebab).toBe('-webkit-transform');
	});

	test('-> get/setStyle/getScroller', () => {
		let div = document.createElement('div');
		div.style.width = '200px';
		div.style.overflow = 'auto';
		div.style.padding = '40px';

		DOM.setStyle(div, 'height', '200px');

		expect(DOM.getStyle(div, 'width')).toBe('200px');
		expect(DOM.getStyle(div, 'height')).toBe('200px');


		let span = document.createElement('span');
		div.appendChild(span);

		document.body.style.marginTop = '20px';
		document.body.appendChild(div);
		expect(DOM.getScroller(span)).toBe(div);
		// expect(DOM.contains(span, div)).toBe(false);
	});
});


