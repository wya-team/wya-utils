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
