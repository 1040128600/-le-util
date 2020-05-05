
export class URLManager {
	/**
	 * 创建新的url
	 */
	merge (route, opts = {}) {
		const {
			path, // ['', 'sd']
			query
		} = route;
		let result = path instanceof Array 
			? path.join('/')
			: path;

		let queryArr = [];
		for (let key in query) {
			if (query[key] || query[key] === false || query[key] === 0) { // 过滤掉值为null,undefined,''情况
				queryArr.push(`${key}=${encodeURIComponent(query[key])}`);
			}
		}

		if (queryArr.length > 0) {
			result += (result.indexOf('?') > -1 ? '&' : '?') + queryArr.join('&');
		}
		return result;
	}
	/**
	 * 解析url
	 * @param  {String} url
	 * @return {Object}
	 */	
	parse(url, opts = {}) {
		url = url || `${location.pathname}${location.search}`;
		let path = '';
		const query = {};
		const urlArr = url.split('?');
		path = urlArr[0];
		if (urlArr[1]) {
			urlArr[1].split('&').filter(i => i !== '').forEach(str => {
				const arr = str.split('=');
				
				const key = arr[0];
				const value = arr[1] === undefined ? undefined : decodeURIComponent(arr[1]);
				query[key] = value;
			});
		}
		return {
			path,
			query
		};
	}

	// get(key, url, opts = {}){
	// 	url = url 
	// 		? url.substring(url.indexOf('?')) 
	// 		: window.location.search;
	// 	let regExp = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	// 	let val = decodeURIComponent(url).substr(1).match(regExp);

	// 	val = val != null ? unescape(val[2]) : null;

	// 	try {
	// 		val = JSON.parse(val);
	// 		// 避免string套string, 暂时处理，可考虑while
	// 		val = typeof val === 'string' ? JSON.parse(val) : val;
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// 	return val;
	// }
}
export const URL = new URLManager();