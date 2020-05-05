import { getUid, getObjectValue, setData, treeForEach, findNodeByValue, 
	findNodeByLabel, initTree, createWorker, deepFreeze, getFormatNum } from '../src/funcs';
describe('funcs test', () => {
	test('getUid should return unique value', () => {
		expect(getUid() == getUid()).toBe(false);
	});	
});
describe('getObjectValue test', () => {
	test('getObjectValue by string', () => {
		expect(getObjectValue({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1);
	});	
	test('getObjectValue by string array', () => {
		expect(getObjectValue({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(1);
	});	
	test('getObjectValue by other type result undefined', () => {
		expect(getObjectValue({ a: { b: { c: 1 } } }, new Date())).toBe(undefined);
		expect(getObjectValue({ a: { b: { c: 1 } } }, null)).toBe(undefined);
	});
	test('getObjectValue by "" or [] type result object', () => {
		const obj = { a: { b: { c: 1 } } };
		expect(getObjectValue(obj, '')).toBe(obj);
		expect(getObjectValue(obj, [])).toBe(obj);
	});
	test('getObjectValue by "" or [] type result null', () => {
		const obj = { a: { b: { c: null } } }; 
		expect(getObjectValue(obj, 'a.b.c')).toBe(null);
		expect(getObjectValue(obj, 'a.b.c.d')).toBe(undefined);
		expect(getObjectValue(obj, 'a.b.g')).toBe(undefined);
	});
});