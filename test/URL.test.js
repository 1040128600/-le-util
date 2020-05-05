import { URL, URLManager } from '../src/URL';

describe('URL type check', () => {
	test('URLManager should be a function ', () => {
		expect(typeof URLManager).toBe('function');
	});	
	test('URL should be an instance of URLManager ', () => {
		expect(URL instanceof URLManager).toBe(true);
	});
});
describe('URL test', () => {
	test('URL.merge', () => {
		expect(URL.merge({ path: "/a/b", query: { a: 1, b: 2 } })).toBe('/a/b?a=1&b=2');
		expect(URL.merge({ path: "/a/b?z=1", query: { a: 1, b: 2 } })).toBe('/a/b?z=1&a=1&b=2');
	});	
	test('URL.parse normal scence', () => {
		const result = URL.parse('/a/b?a=1&b=2&c=0');
		expect(result.path).toBe('/a/b');
		expect(JSON.stringify(result.query)).toBe(JSON.stringify({ a: '1', b: '2', c: '0' }));
	});	
	test('URL.parse unnormal scence', () => {
		const result = URL.parse('/a/b?');
		expect(result.path).toBe('/a/b');
		expect(result.query).toEqual({});
		const result2 = URL.parse('/a/b?a&b&c&');
		expect(result2.query).toEqual({ a: undefined, b: undefined, c: undefined });
		
	});
});