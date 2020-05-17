import { Emitter, emitter  }  from '../src/Emitter';
describe('Emitter test', () => {
	test('Emitter should be a function', () => {
		expect(typeof Emitter).toBe('function');
	});
	test('emitter should be an object ', () => {
		expect(typeof emitter).toBe('object');
	});
	test('emitter should be an instance of  Emitter', () => {
		expect( emitter instanceof Emitter).toBe(true);
	});
	test('emitter on should add fn to store', () => {
		const fn = () => {};
		emitter.on('event1', fn);
		expect( emitter.store.event1.length).toBe(1);
		expect( emitter.store.event1[0]).toBe(fn);
		emitter.off('event1');
	});
	test('emitter off should remove fn from store', () => {
		const fn = () => {};
		emitter.on('event1', fn);
		expect( emitter.store.event1.length).toBe(1);
		expect( emitter.store.event1[0]).toBe(fn);
		emitter.off('event1', fn);
	});
	test('emitter off should remove all fn from store when not given a callback', () => {
		emitter.on('event1', () => 1);
		emitter.on('event1', () => 2);
		expect( emitter.store.event1.length).toBe(2);
		emitter.off('event1');
		expect( emitter.store.event1).toBe(undefined);
	});
	test('emitter emit should execute all callback in store', () => {
		let i = 0;
		let j = 0;
		emitter.on('event1', () => i++);
		emitter.on('event1', () => j++);
		emitter.emit('event1');
		expect( i).toBe(1);
		expect( j).toBe(1);
	});
	test('emitter emit should execute all callback in store with payload', () => {
		let result;
		emitter.on('event1', (a, b, c) => result = [a, b, c]);
		emitter.emit('event1', 1, 2, 3);
		expect(result).toEqual([1, 2, 3]);
	});
});