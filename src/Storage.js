// 规范本地缓存写法

export class StorageManager {
	constructor(option = {}) {
		const { prefix = "le-util", version = "0" } = option;
		this.prefix = prefix;
		this.version = version;
		this.setVersion(version);
		this.storageTypeMap = {
			local: window.localStorage,
			session: window.sessionStorage
		};	
	}
	formatKey(key = ''){
		return `${this.prefix}${this.version}:${key}`;
	}

	getStorage(storageType) {
		const store =  this.storageTypeMap[storageType];
		if (!store){
			throw new Error('le-util: unknow storage type ' + storageType + ", support type is  " + Object.keys(this.storageTypeMap).join(','));
		}
		return store;
	}
	setVersion(version) {
		this.version = version;
		// 清除其他版本的缓存
		Object.keys(window.localStorage).forEach((item) => {
			if (
				item.startsWith(this.prefix)
				&& !item.startsWith(this.formatKey())
			) {
				window.localStorage.removeItem(item);
			}
		});
		Object.keys(window.sessionStorage).forEach((item) => {
			if (
				item.startsWith(this.prefix)
				&& !item.startsWith(this.formatKey())
			) {
				window.sessionStorage.removeItem(item);
			}
		});
	}
	/**
	 * 设置缓存，注意val会被json化，不能存储Symbol和循环引用的对象
	 * @param key 保存的键值
	 * @param val 保存的内容
	 */
	set(key, val, storageType = "local") {
		key = this.formatKey(key);
		this.getStorage(storageType).setItem(key, JSON.stringify(val));
	}
	/**
	 * 获取缓存
	 * @param  {[String]} key 获取的键值
	 * @return {Object}
	 */
	get(key, storageType = "local") {
		key = this.formatKey(key);
		try {
			const str = this.getStorage(storageType).getItem(key);
			return JSON.parse(str);
		} catch (e) {
			console.error(e);
			return null;
		}
	}
	/**
	 * 删除缓存
	 * @param  {[String]} key 删除的键值
	 */
	remove(key, storageType = 'local') {
		key = this.formatKey(key);
		this.getStorage(storageType).removeItem(key);
	}
}
export const  Storage  = new StorageManager();