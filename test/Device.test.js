import { Device, DeviceManager }  from '../src/Device';
describe('DeviceManager test', () => {
	test('DeviceManager should be a function', () => {
		expect(typeof DeviceManager).toBe('function');
	});
	test('Device should be an object ', () => {
		expect(typeof Device).toBe('object');
	});
	test('Device should be an instance of  DeviceManager', () => {
		expect( Device instanceof DeviceManager).toBe(true);
	});
   
});
