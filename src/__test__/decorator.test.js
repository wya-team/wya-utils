import { Decorator } from '..';

describe('Decorator.js', () => {
	jest.setTimeout(20000);

	test('AutoCatch', () => {
		let methods = {
			user: 'wya',
			@Decorator.AutoCatch()
			async request() {
				await Promise.reject({
					msg: '失败了'
				});
			},
			handleCatch(res) {
				expect(this.user).toBe('wya');
				expect(res.msg).toBe('失败了');
			}
		};

		methods.request();
	});

	test('AutoCatch: ArrowFunc', () => {
		let methods = {
			user: 'wya',
			@Decorator.AutoCatch()
			request: async () => {
				await Promise.reject({
					msg: '失败了'
				});
			},
			handleCatch: (res) => {
				expect(this).toBe(undefined);
				expect(res.msg).toBe('失败了');
			}
		};

		methods.request();
	});

	test('Debounce: 默认执行最后一次', async () => {
		let methods = {
			user: 'wya',
			@Decorator.Debounce()
			debounce(res) {
				expect(this.user).toBe('wya');
				expect(res).toBe(3);
			}
		};

		methods.debounce(1);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(3);

		await new Promise((r) => setTimeout(r, 0));
	});

	test('Debounce: 执行第一次和最后一次1', async () => {
		let next = 1;
		let methods = {
			user: 'wya',
			@Decorator.Debounce(100, { leading: true })
			debounce: (res) => {
				expect(this).toBe(undefined);
				expect(res).toBe(next);
				next = 3;
			}
		};

		methods.debounce(1);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(3);

		await new Promise((r) => setTimeout(r, 20));
	});

	test('Debounce: 执行第一次和最后一次2', async () => {
		let next = 1;
		let methods = {
			user: 'wya',
			@Decorator.Debounce(100, { leading: true })
			debounce: (res) => {
				expect(res).toBe(next);
				next++;
			}
		};

		methods.debounce(1);

		await new Promise((r) => setTimeout(r, 20));
	});

	test('Debounce: 执行第一次', async () => {
		let methods = {
			@Decorator.Debounce(10, { leading: true, trailing: false })
			debounce(res) {
				expect(res).toBe(1);
			}
		};

		methods.debounce(1);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(3);

		await new Promise((r) => setTimeout(r, 10));
	});

	test('Debounce: 均不执行', async () => {
		let methods = {
			@Decorator.Debounce(0, { trailing: false })
			debounce(res) {
				expect(res).toBe('均不执行');
			}
		};

		methods.debounce(1);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(3);

		await new Promise((r) => setTimeout(r, 10));
	});

	test('Debounce: cancel', async () => {
		let methods = {
			@Decorator.Debounce(100)
			debounce(res) {
				expect(res).toBe('均不执行');
			}
		};

		methods.debounce(1);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(3);

		methods.debounce.cancel();
		await new Promise((r) => setTimeout(r, 100));
	});


	test('Debounce: flush', async () => {
		let methods = {
			@Decorator.Debounce(10000000)
			debounce(res) {
				expect(res).toBe(3);
			}
		};

		methods.debounce(1);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(2);
		methods.debounce(3);

		methods.debounce.flush();
		await new Promise((r) => setTimeout(r, 100));
	});


	test('Throttle', async () => {
		let next = 1;
		let methods = {
			@Decorator.Throttle()
			throttle(res) {
				expect(res).toBe(next);
				next++;
			}
		};

		methods.throttle(1);
		methods.throttle(2);
		methods.throttle(3);

		await new Promise((r) => setTimeout(r, 100));
	});

	test('Throttle', async () => {
		let methods = {
			@Decorator.Throttle(10)
			throttle(res) {
				console.log(res);
			}
		};

		methods.throttle(1);

		await new Promise((r) => setTimeout(r, 100));
	});
});
