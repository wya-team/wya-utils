const rebuildDescriptor = (descriptor, enhancer) => {
	const isArrowFunc = descriptor.initializer;
	const original = isArrowFunc ? descriptor.initializer() : descriptor.value;

	let method = enhancer(original);
	descriptor[isArrowFunc ? 'initializer' : 'value'] = isArrowFunc 
		? () => method
		: method;

	return descriptor;
};

class DecoratorManager {
	static AutoCatch = (cb) => (ctx, name, descriptor) => {
		cb = cb || ctx['handleCatch'] || (err => console.log(`@wya/utils - decorator:`, err));

		const enhancer = original => (...args) => {
			return Promise.resolve(original.apply(ctx, args)).catch(cb.bind(ctx));
		};

		rebuildDescriptor(descriptor, enhancer);
	}

	// 同lodash api
	static Debounce = (wait = 0, opts = {}) => (ctx, name, descriptor) => {
		// leading: 指定在延迟开始前调用。
		// trailing: 指定在延迟结束后调用。
		const { leading = false, trailing = true } = opts;
		
		let timer;
		let allowNext = true;

		let cancel = () => {
			timer && clearTimeout(timer);
			allowNext = true;
			timer = null;
		};

		let invoke = (flush, firtst) => {
			allowNext = false;
			leading && firtst && flush();
			timer = setTimeout(() => {
				cancel();
				!firtst && trailing && flush();
			}, wait);
		};

		let enhancer = original => {
			let flush;
			const debounce = (...args) => {
				flush = () => original.apply(ctx, args);
				if (allowNext) {
					invoke(flush, true);
				} else {
					cancel();
					invoke(flush, false);
				}
			};
			debounce.cancel = cancel;
			debounce.flush = () => {
				cancel();
				trailing && flush();
			};
			return debounce;
		};

		rebuildDescriptor(descriptor, enhancer);
	}

	// 同lodash api
	static Throttle = (wait = 0, opts = {}) => (ctx, name, descriptor) => {
		
	}
};
export const Decorator = DecoratorManager;