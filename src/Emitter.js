export class Emitter {
	constructor() {
		this.store = {};
	}
	on(event, callback) {
		if (!this.store[event]) {
			this.store[event] = [];
		}
		this.store[event].push(callback);
	}
	off(event, callback) {
		if (!this.store[event]) return;
		if (!callback) {
			delete this.store[event];
			return;
		}
		const index = this.store[event].indexOf(callback);
		if (index > -1) {
			this.store[event].splice(index, 1);
			if (this.store[event].length == 0) {
				delete this.store[event]; 
			}
		}
		
	}
	emit(event, ...rest) {
		if (!this.store[event]) return;
		this.store[event].forEach(callback => {
			try {
				callback(...rest);
			} catch (e) {
				console.error(e);
			}
		});
	}
}
export const emitter = new Emitter();