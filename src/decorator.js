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
		cb = cb || ctx['handleCatch'] || (err => console.log(`@wya/utils - decorator:`, err));

		const enhancer = original => (...args) => {
			return Promise.resolve(original.apply(ctx, args)).catch(cb.bind(ctx));
		};

		this._rebuildDescriptor(descriptor, enhancer);
	}

	// 同lodash api
	static Debounce = (wait = 0, opts = {}) => (ctx, name, descriptor) => {
		const { leading = false, trailing = true } = opts;
		this._rebuildDescriptor(
			descriptor, 
			(original) => this._debounce(
				original.bind(ctx),
				wait, 
				{ 
					leading, 
					trailing 
				}
			)
		);
	}

	static Throttle = (wait = 0, opts = {}) => (ctx, name, descriptor) => {
		const { leading = true, trailing = true } = opts;
		this._rebuildDescriptor(
			descriptor, 
			(original) => this._debounce(
				original.bind(ctx),
				wait, 
				{ 
					leading, 
					trailing,
					throttle: true
				}
			)
		);
	}
};
export const Decorator = DecoratorManager;