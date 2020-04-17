import { Storage, Cookie } from '../cache';

describe('cache.js', () => {
	test('验证api', () => {
		if (IS_SERVER) return;
		expect(Storage !== window.Storage).toBe(true);
		const fn = target => {
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
		};
		[Storage, Cookie].forEach(fn);
		Storage.setVersion('1.0');
		[Storage, Cookie].forEach(fn);
	});

	test('Targer: Node', () => {
		if (!IS_SERVER) return;
		const fn = target => {
			expect(!target.setVersion()).toBe(true);
			expect(!target.get()).toBe(true);
			expect(!target.set()).toBe(true);
			expect(!target.remove()).toBe(true);
		};
		[Storage, Cookie].forEach(fn);
	});
});
