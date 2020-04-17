import { DOM, $ } from '..';

describe('dom.js', () => {
	test('验证api', () => {
		expect(DOM === $).toBe(true);
		expect(typeof $).toBe('function');
		expect(typeof $.fn).toBe('object');
		expect(typeof $.prefixStyle).toBe('function');
		expect(typeof $.composedPath).toBe('function');
		expect(typeof $.fn.on).toBe('function');
		expect(typeof $.fn.off).toBe('function');
		expect(typeof $.fn.addClass).toBe('function');
		expect(typeof $.fn.removeClass).toBe('function');
		expect(typeof $.fn.hasClass).toBe('function');
		expect(typeof $.fn.getStyle).toBe('function');
		expect(typeof $.fn.setStyle).toBe('function');
		expect(typeof $.fn.isScroll).toBe('function');
		expect(typeof $.fn.getScroller).toBe('function');
		expect(typeof $.fn.contains).toBe('function');
		expect(typeof $.fn.scrollIntoView).toBe('function');
	});

	test('-> on/off', () => {
		if (IS_SERVER) return;
		let count = 0;
		let trigger = () => {
			let eventA = new KeyboardEvent('keydown', { 'keyCode': 65 });
			document.dispatchEvent(eventA);
		};

		let handler = (e) => {
			expect(e.keyCode).toBe(65);
			count++;
		};

		DOM(window.document).on('keydown', handler);
		trigger();
		expect(count).toBe(1);
		trigger();
		expect(count).toBe(2);

		DOM(window.document).off('keydown', handler);
		trigger();
		expect(count).toBe(2);
		trigger();
		expect(count).toBe(2);

		DOM(window.document).once('keydown', handler);

		trigger();
		expect(count).toBe(3);
		trigger();
		expect(count).toBe(3);
	});

	test('-> prefixStyle', () => {
		if (IS_SERVER) return;
		expect(DOM.prefixStyle('transform').camel).toBe('webkitTransform');
		expect(DOM.prefixStyle('transform').kebab).toBe('-webkit-transform');
	});

	test('-> style/class/getScroller', () => {
		if (IS_SERVER) return;
		let div = document.createElement('div');
		div.style.width = '200px';
		div.style.overflow = 'auto';
		div.style.padding = '40px';

		$(div).setStyle('height', '200px');

		expect($(div).getStyle('width')).toBe('200px');
		expect($(div).getStyle('height')).toBe('200px');

		let span = document.createElement('span');
		div.appendChild(span);

		document.body.style.marginTop = '20px';
		document.body.appendChild(div);
		expect($(div).getScroller()).toBe(div);


		$(div).addClass('test1').addClass('test2').addClass('test3');
		expect(div.classList.contains('test1')).toBe(true);
		expect(div.classList.contains('test2')).toBe(true);
		expect(div.classList.contains('test3')).toBe(true);
		expect(div.classList.contains('test4')).toBe(false);

		$(div).removeClass('test1').removeClass('test2');
		expect(div.classList.contains('test1')).toBe(false);
		expect(div.classList.contains('test2')).toBe(false);
		expect(div.classList.contains('test3')).toBe(true);

		// 测试环境下为false
		expect($(div).contains(span)).toBe(false);
	});

	test('Target: Node', () => {
		if (!IS_SERVER) return;
		
		let target = $('div')
			.on()
			.once()
			.off()
			.addClass()
			.removeClass()
			.setStyle()
			.scrollIntoView();

		expect(!$.prefixStyle().camel).toBe(true);
		expect(!$.prefixStyle().prefix).toBe(true);
		expect(!$(target).isScroll()).toBe(true);
		expect(!$(target).hasClass()).toBe(true);
		expect(!$(target).getStyle()).toBe(true);
		expect(!$(target).contains()).toBe(true);
		expect(!$(target).getScroller()).toBe(true);
	});
});


