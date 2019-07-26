export default class FakeManager {
	constructor() {
		this.store = {};
	}
	getItem(key) {
		return this.store[key] || null;
	}
	setItem(key, val) {
		this.store[key] = val;
	}
	removeItem(key) {
		delete this.store[key];
	}
}