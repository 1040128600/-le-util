import { Storage, StorageManager }  from '../src/Storage';

describe('StorageManager test', () => {
	test('Storage export type check', () => {
		expect(typeof StorageManager).toBe('function');
		expect(typeof Storage).toBe('object');
		expect( Storage instanceof StorageManager).toBe(true);
	});
	test('Storage.prefix should be default le-util,version = 0', () => {
		expect( Storage.prefix).toBe('le-util');
		expect( Storage.version).toBe('0');
	});
	test('Storage.formatKey  ', () => {
		expect( Storage.formatKey('aa')).toBe('le-util0:aa');
	});
	test('Storage.set , get width local mode with string,number,object,array,null,undefined  ', () => {
		Storage.set('name', 'Lawrence');
		expect( Storage.get('name')).toBe('Lawrence');

		Storage.set('name', 100);
		expect( Storage.get('name')).toBe(100);

		const user = { name: 'AA', age: 10, a: null, b: undefined, f: [{ a: 1 }, { b: 'xx' }] };
		Storage.set('user', user);
		expect(JSON.stringify(Storage.get('user'))).toBe(JSON.stringify(user));
		window.localStorage.clear();
		
	});
	test('Storage.set , get width session mode with string,number,object,array,null,undefined  ', () => {
		Storage.set('name', 'Lawrence', 'session');
		expect( Storage.get('name', 'session')).toBe('Lawrence');

		Storage.set('name', 100, 'session');
		expect( Storage.get('name', 'session')).toBe(100);
		const arr = ['123', 123];
		Storage.set('arr', arr, 'session');
		expect( JSON.stringify(Storage.get('arr', 'session'))).toBe(JSON.stringify(arr));

		const user = { name: 'AA', age: 10, a: null, b: undefined, f: [{ a: 1 }, { b: 'xx' }] };
		Storage.set('user', user, 'session');
		expect(Storage.get('user', 'session').a).toBe(null);
		expect( JSON.stringify(Storage.get('user', 'session'))).toBe(JSON.stringify(user));
		window.sessionStorage.clear();
	});
	test('Storage.remove local', () => {
		Storage.set('name', 'Lawrence');
		expect( Storage.get('name')).toBe('Lawrence');
		Storage.remove('name');
		expect( Storage.get('name')).toBe(null);
		window.localStorage.clear();

	});
	test('Storage.remove session', () => {
		Storage.set('name', 'Lawrence', 'session');
		expect( Storage.get('name', 'session')).toBe('Lawrence');
		Storage.remove('name', 'session');
		expect( Storage.get('name', 'session')).toBe(null);
		window.sessionStorage.clear();
	});
	test('Storage.setVersion ', () => {
		Storage.setVersion('1.0');
		expect(Storage.version).toBe('1.0');
		Storage.set('name', 'lora');
		expect(Storage.get('name')).toBe('lora');
		Storage.setVersion('1.1');
		expect(Storage.get('name')).toBe(null);

		Storage.set('name2', 'name2', 'session');
		expect(window.sessionStorage.getItem(Storage.formatKey("name2"))).toBe('"name2"');
		Storage.setVersion('1.2');
		expect(window.sessionStorage.getItem(Storage.formatKey("name2"))).toBe(null);
		window.sessionStorage.clear();
		window.localStorage.clear();
	});
   
});
