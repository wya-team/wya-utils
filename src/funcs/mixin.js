// 用于对象 
// @createMixins({})
// class {}
export const createMixins = (...mixins) => target => {
	Object.assign(target.prototype, ...mixins);
};
