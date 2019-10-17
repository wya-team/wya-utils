import { Dom } from '..';

describe('dom.js', () => {
	test('验证api', () => {
		expect(typeof Dom).toBe('function');
		expect(typeof Dom.on).toBe('function');
		expect(typeof Dom.off).toBe('function');
		expect(typeof Dom.addClass).toBe('function');
		expect(typeof Dom.removeClass).toBe('function');
		expect(typeof Dom.hasClass).toBe('function');
		expect(typeof Dom.prefixStyle).toBe('function');
		expect(typeof Dom.getStyle).toBe('function');
		expect(typeof Dom.setStyle).toBe('function');
		expect(typeof Dom.isScroll).toBe('function');
		expect(typeof Dom.getScroller).toBe('function');
		expect(typeof Dom.contains).toBe('function');
		expect(typeof Dom.composedPath).toBe('function');
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

		Dom.on(window.document, 'keydown', handler);
		trigger();
		expect(count).toBe(1);
		trigger();
		expect(count).toBe(2);


		Dom.off(window.document, 'keydown', handler);
		trigger();
		expect(count).toBe(2);
		trigger();
		expect(count).toBe(2);

		Dom.once(window.document, 'keydown', handler);

		trigger();
		expect(count).toBe(3);
		trigger();
		expect(count).toBe(3);
	});

	test('-> prefixStyle', () => {
		expect(Dom.prefixStyle('transform').camel).toBe('webkitTransform');
		expect(Dom.prefixStyle('transform').kebab).toBe('-webkit-transform');
	});

	test('-> get/setStyle/getScroller', () => {
		let div = document.createElement('div');
		div.style.width = '200px';
		div.style.overflow = 'auto';
		div.style.padding = '40px';

		Dom.setStyle(div, 'height', '200px');

		expect(Dom.getStyle(div, 'width')).toBe('200px');
		expect(Dom.getStyle(div, 'height')).toBe('200px');


		let span = document.createElement('span');
		div.appendChild(span);

		document.body.style.marginTop = '20px';
		document.body.appendChild(div);
		expect(Dom.getScroller(span)).toBe(div);
		// expect(Dom.contains(span, div)).toBe(false);
	});
});


