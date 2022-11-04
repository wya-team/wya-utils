import { Utils } from '..';

describe('url.js', () => {
	test('验证api', () => {
		expect(typeof Utils).toBe('object');

		Utils.set({
			invoke() {
				return 1;
			}
		});

		expect(Utils.invoke()).toBe(1);
	});
});

describe('format.js', () => {
	test('encrypt', () => {
		expect(Utils.encrypt('17812345678')).toBe('178****5678');
	});
});
