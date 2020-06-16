import { Decorator } from '..';

describe('Decorator.js', () => {
	jest.setTimeout(20000);

	
	afterEach(() => {});
	beforeEach(() => {});
	afterAll(() => {});
	beforeAll(() => {});

	test('AutoCatch', async () => {
		let isInvoke = false;
		let methods = {
			user: 'wya',
			@Decorator.AutoCatch()
			async request() {
				await Promise.reject({
					msg: '失败了'
				});
			},
			handleCatch(res) {
				isInvoke = true;
				expect(this.user).toBe('wya');
				expect(res.msg).toBe('失败了');
			}
		};

		await methods.request();
		expect(isInvoke).toBe(true);
	});

	test('AutoCatch: ArrowFunc', async () => {
		let isInvoke = false;
		let methods = {
			user: 'wya',
			@Decorator.AutoCatch()
			request: async () => {
				await Promise.reject({
					msg: '失败了'
				});
			},
			handleCatch: (res) => {
				isInvoke = true;
				expect(this).toBe(undefined);
				expect(res.msg).toBe('失败了');
			}
		};

		await methods.request();
		expect(isInvoke).toBe(true);
	});

	test('Debounce: 默认执行最后一次', async () => {
		let isInvoke = false;
		let methods = {
			user: 'wya',
			@Decorator.Debounce()
			debounce(res) {
				isInvoke = true;
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
		expect(isInvoke).toBe(true);
	});

	test('Debounce: 执行第一次和最后一次1', async () => {
		let isInvoke = false;
		let next = 1;
		let methods = {
			user: 'wya',
			@Decorator.Debounce(100, { leading: true })
			debounce: (res) => {
				isInvoke = true;
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
		expect(isInvoke).toBe(true);
	});

	test('Debounce: 执行第一次和最后一次2', async () => {
		let isInvoke = false;
		let next = 1;
		let methods = {
			user: 'wya',
			@Decorator.Debounce(100, { leading: true })
			debounce: (res) => {
				isInvoke = true;
				expect(res).toBe(next);
				next++;
			}
		};

		methods.debounce(1);

		await new Promise((r) => setTimeout(r, 20));
		expect(isInvoke).toBe(true);
	});

	test('Debounce: 执行第一次', async () => {
		let isInvoke = false;
		let methods = {
			@Decorator.Debounce(10, { leading: true, trailing: false })
			debounce(res) {
				isInvoke = true;
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
		expect(isInvoke).toBe(true);
	});

	test('Debounce: 均不执行', async () => {
		let isInvoke = false;
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
		expect(isInvoke).toBe(false);
	});

	test('Debounce: cancel', async () => {
		let isInvoke = false;
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
		methods.debounce.flush();
		await new Promise((r) => setTimeout(r, 100));
		expect(isInvoke).toBe(false);
	});


	test('Debounce: flush', async () => {
		let isInvoke = false;
		let next = 3;
		let methods = {
			@Decorator.Debounce(10000000)
			debounce(res) {
				isInvoke = true;
				expect(res).toBe(next);
				next++;
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
		expect(isInvoke).toBe(true);

		methods.debounce.flush(); // 不会再执行
		methods.debounce.flush(); // 不会再执行
		methods.debounce.flush(); // 不会再执行
		methods.debounce.flush(); // 不会再执行

		await new Promise((r) => setTimeout(r, 100));
		
	});


	test('Throttle: wait = 0', async () => {
		let isInvoke = false;
		let next = 1;
		let methods = {
			@Decorator.Throttle()
			throttle(res) {
				isInvoke = true;
				expect(res).toBe(next);
				next++;
			}
		};

		methods.throttle(1);
		methods.throttle(2);
		methods.throttle(3);

		await new Promise((r) => setTimeout(r, 100));
		expect(isInvoke).toBe(true);
	});

	test('Throttle: basic', async () => {
		let isInvoke = false;
		let methods = {
			@Decorator.Throttle(10)
			throttle(res) {
				isInvoke = true;
				expect(res).toBe(1);
			}
		};

		methods.throttle(1);

		await new Promise((r) => setTimeout(r, 100));
		expect(isInvoke).toBe(true);
	});

	test('Throttle: 10ms 后执行2', async () => {
		let isInvoke = false;
		let next = 1;
		let methods = {
			@Decorator.Throttle(10)
			throttle(res) {
				isInvoke = true;
				expect(res).toBe(next);
				next++;
			}
		};

		methods.throttle(1);
		methods.throttle(2); // 均被取消
		methods.throttle(2); // 均被取消
		methods.throttle(3); // 均被取消
		methods.throttle(4); // 均被取消
		methods.throttle(5); // 均被取消
		methods.throttle(2);

		await wait(0.05, () => methods.throttle(3));
		expect(isInvoke).toBe(true);
		expect(next).toBe(4);
	});

	test('Throttle: cancel', async () => {
		let isInvoke = false;
		let methods = {
			@Decorator.Throttle(10)
			throttle(res) {
				isInvoke = true;
				expect(res).toBe('仅执行第一次');
			}
		};

		methods.throttle('仅执行第一次');
		methods.throttle(2);
		methods.throttle(2);
		methods.throttle(2);
		methods.throttle(2);
		methods.throttle(2);
		methods.throttle(2);
		methods.throttle(3);

		methods.throttle.cancel();
		methods.throttle.flush();
		await new Promise((r) => setTimeout(r, 100));
		expect(isInvoke).toBe(true);
	});

	test('Throttle: flush', async () => {
		let isInvoke = false;
		let next = 1;
		let methods = {
			@Decorator.Throttle(10000000)
			throttle(res) {
				isInvoke = true;
				expect(res).toBe(next);
				next++;
			}
		};

		methods.throttle(1);
		methods.throttle(3);
		methods.throttle(3);
		methods.throttle(3);
		methods.throttle(3);
		methods.throttle(3);
		methods.throttle(3);
		methods.throttle(2);

		methods.throttle.flush();
		methods.throttle.flush(); // 不会再执行
		methods.throttle.flush(); // 不会再执行
		methods.throttle.flush(); // 不会再执行
		methods.throttle.flush(); // 不会再执行

		expect(isInvoke).toBe(true);
		expect(next).toBe(3);
	});
});
