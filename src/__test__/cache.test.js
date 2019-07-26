import { Storage, Cookie } from '../cache';

describe('cache.js', () => {
	test('验证api', () => {
		expect(Storage === window.Storage).toBe(false);
		[Storage, Cookie].forEach(target => {
			expect(typeof target.get).toBe('function');
			expect(typeof target.set).toBe('function');
			expect(typeof target.remove).toBe('function');

			target.set('user', { name: 'wya' });
			
			expect(target.get('user').name).toBe('wya');

			target.set('user', '{"name": "wya1"}');
			expect(target.get('user').name).toBe('wya1');

			target.set('user', 'wya');
			expect(target.get('user')).toBe('wya');

			target.remove('user');
			expect(target.get('user')).toBe(null);
		});
	});
});
