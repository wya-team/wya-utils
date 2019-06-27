import { URL } from '..';

describe('url.js', () => {
	test('验证api', () => {
		expect(URL === window.URL).toBe(false);

		// 设置当前网址
		window.history.replaceState(null, null, '/home/main?user=wya');

		expect(URL.parse().query.user).toBe('wya');
		
		expect(URL.merge({
			path: '/home/main',
			query: {
				user: 'wya'
			}
		})).toBe('/home/main?user=wya');

		expect(URL.get('user')).toBe('wya');
		expect(URL.get('user2')).toBe(null);

		expect(URL.merge({
			path: '/home/main?test=1',
			query: {
				user: 'wya'
			}
		})).toBe('/home/main?test=1&user=wya');
	});
});
