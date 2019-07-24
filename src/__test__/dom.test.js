import { Dom } from '..';

describe('dom.js', () => {
	test('验证api', () => {
		expect(typeof Dom).toBe('function');
		expect(typeof Dom.addClass).toBe('function');
		expect(typeof Dom.removeClass).toBe('function');
		expect(typeof Dom.hasClass).toBe('function');
		expect(typeof Dom.prefixStyle).toBe('function');

		expect(Dom.prefixStyle('transform').camel).toBe('webkitTransform');
		expect(Dom.prefixStyle('transform').kebab).toBe('-webkit-transform');
	});
});
