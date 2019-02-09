/**
 * 原型合并或者多(合并)继承
 */
const copyProperties = (target, source) => {
	for (let key of Reflect.ownKeys(source)) {
		if ( key !== "constructor"
			&& key !== "prototype"
			&& key !== "name"
		) {
			let desc = Object.getOwnPropertyDescriptor(source, key);
			Object.defineProperty(target, key, desc);
		}
	}
};
// 用于class
// class xxx extends mixins(a, b, c) {}
export const mixins = (...mixins) => {
	class Mix {}

	for (let mixin of mixins) {
		copyProperties(Mix, mixin); // 拷贝实例属性
		copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
	}

	return Mix;
};
// 用于对象 
// @createMixins({})
// class {}
export const createMixins = (...mixins) => target => {
	Object.assign(target.prototype, ...mixins);
};
