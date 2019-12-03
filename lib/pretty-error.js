module.exports = class StacklessError extends Error {
	constructor(message) {
		super(message);
		this.excludeStack = true;
	}
};
