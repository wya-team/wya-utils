import { Stroage, Cookie } from '..';

describe('cache.js', () => {
	test('验证api', () => {
		expect(typeof Stroage.get).toBe('function');
		expect(typeof Stroage.set).toBe('function');
		expect(typeof Stroage.remove).toBe('function');

		expect(typeof Cookie.get).toBe('function');
		expect(typeof Cookie.set).toBe('function');
		expect(typeof Cookie.remove).toBe('function');


		Stroage.set('user', { name: 'wya' });
		expect(Stroage.get('user').name).toBe('wya');

		Stroage.remove('user');
		expect(Stroage.get('user')).toBe(null);


		Cookie.set('user', { name: 'wya' });
		expect(Cookie.get('user').name).toBe('wya');

		Cookie.remove('user');
		expect(Cookie.get('user')).toBe(null);
	});
});
