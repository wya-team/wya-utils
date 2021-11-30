/**
 * TODO: 不支持Class上使用，this指向不是实例后的
 */
class DecoratorManager {
	static _rebuildDescriptor = (descriptor, enhancer) => {
		const isArrowFunc = descriptor.initializer;
		const original = isArrowFunc ? descriptor.initializer() : descriptor.value;

		let method = enhancer(original);
		descriptor[isArrowFunc ? 'initializer' : 'value'] = isArrowFunc 
			? () => method
			: method;

		return descriptor;
	};

	// leading: 指定在延迟开始前调用。
	// trailing: 指定在延迟结束后调用。
	static _debounce = (original, wait, opts = {}) => {
		const { leading, trailing, throttle } = opts;
		let timer;
		let invoke;

		let cancel = () => {
			timer && clearTimeout(timer);
			timer = null;
		};

		let start = () => {
			timer = setTimeout(() => {
				timer = null;
				trailing && invoke && invoke();
			}, wait);
		};
		const fn = (...args) => {
			invoke = () => {
				original(...args);
				invoke = null;
			};
			if (!wait && throttle) return invoke();
			if (!timer) {
				leading && invoke();
				start();
			} else if (!throttle) {
				cancel();
				start();
			}
		};

		fn.cancel = () => {
			cancel();
			invoke = null;
		};
		fn.flush = () => {
			cancel();
			trailing && invoke && invoke();
		};

		return fn;
	};

	static AutoCatch = (cb) => (ctx, name, descriptor) => {
		cb = cb || ctx['handleAutoCatch'] || (err => console.log(`@wya/utils - decorator:`, err));

		const enhancer = original => (...args) => {
			return Promise
				.resolve(original.apply(ctx, args))
				.catch(cb.bind(ctx));
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}

	// 同lodash api
	static Debounce = (wait = 0, opts = {}) => (ctx, name, descriptor) => {
		const { leading = false, trailing = true } = opts;

		const enhancer = original => {
			return this._debounce(
				original.bind(ctx),
				wait, 
				{ 
					leading, 
					trailing 
				}
			);
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}

	static Throttle = (wait = 0, opts = {}) => (ctx, name, descriptor) => {
		const { leading = true, trailing = true } = opts;

		const enhancer = original => {
			return this._debounce(
				original.bind(ctx),
				wait, 
				{ 
					leading, 
					trailing,
					throttle: true
				}
			);
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}

	static Delay = (wait = 0, opts = {}) => (ctx, name, descriptor) => {
		const enhancer = original => (...args) => {
			return setTimeout(
				() => original.apply(ctx, args), 
				wait
			);
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}

	static Ready = (cb) => (ctx, name, descriptor) => {
		cb = cb 
			|| ctx['$ready'] 
			|| ctx['ready'] 
			|| ctx['$nextTick'] 
			|| ctx['nextTick']
			|| ((done) => {
				console.log(`@wya/utils - decorator: Ready Invalid`);
				done();
			});

		const enhancer = original => (...args) => {
			return cb(() => original.apply(ctx, args));
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}

	static Time = (logger = console) => (ctx, name, descriptor) => {
		let start = logger.time || ((name) => {});
		let end = logger.timeEnd || ((name) => {});

		const enhancer = original => (...args) => {
			start(name);

			const before = original.apply(ctx, args);
			
			if (before && before.then) {
				return before.finally(() => {
					end(name);
				});
			}

			end(name);
			return before;
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}

	static Deprecated = (msg) => (ctx, name, descriptor) => {
		let print = typeof msg === 'function' 
			? msg
			: () => (console.warn || console.log)(`DEPRECATION ${name}: ${msg || 'This function will be removed.'}`);
		const enhancer = original => (...args) => {
			print();
			return original.apply(ctx, args);
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}
};
export const Decorator = DecoratorManager;