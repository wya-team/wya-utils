import { Storage, Cookie } from '../cache';

describe('cache.js', () => {
	test('验证api', () => {
		expect(Storage === window.Storage).toBe(false);
		expect(typeof Storage.get).toBe('function');
		expect(typeof Storage.set).toBe('function');
		expect(typeof Storage.remove).toBe('function');

		expect(typeof Cookie.get).toBe('function');
		expect(typeof Cookie.set).toBe('function');
		expect(typeof Cookie.remove).toBe('function');


		Storage.set('user', { name: 'wya' });
		expect(Storage.get('user').name).toBe('wya');

		Storage.set('user', '{"name": "wya1"}');
		expect(Storage.get('user').name).toBe('wya1');

		Storage.set('user', 'wya');
		expect(Storage.get('user')).toBe('wya');

		Storage.remove('user');
		expect(Storage.get('user')).toBe(null);


		Cookie.set('user', { name: 'wya' });
		expect(Cookie.get('user').name).toBe('wya');

		Cookie.set('user', '{"name": "wya1"}');
		expect(Cookie.get('user').name).toBe('wya1');

		Cookie.set('user', 'wya');
		expect(Cookie.get('user')).toBe('wya');

		Cookie.remove('user');
		expect(Cookie.get('user')).toBe(null);

	});
});
