import { Load } from '..';

describe('load.js', () => {
	test('验证api', () => {
		if (IS_SERVER) return;
		expect(typeof Load).toBe('object');
		expect(typeof Load.css('2')).toBe('object');
		expect(typeof Load.js('2')).toBe('object');
		expect(typeof Load.cssCode('2')).toBe('undefined');

		let code = 'a { color: red }';
		Load.cssCode(code, { id: 'TEST' });
		expect(document.getElementById('TEST').innerHTML).toBe(code);

		Load.removeCSSCode('TEST');

		expect(Load.cssCodeArr.length).toBe(1);

		expect(document.getElementById('TEST')).toBe(null);
	});

	test('Target: Node', () => {
		if (!IS_SERVER) return;
		expect(!Load.css()).toBe(true);
		expect(!Load.js()).toBe(true);
		expect(!Load.cssCode()).toBe(true);
		expect(!Load.removeCSSCode()).toBe(true);
	});
});
