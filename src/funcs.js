
/**
 * 获取唯一的id，以时间为基准，
 */
export const getUid = (
	() => {
		const now = Date.now(); 
		let index = 1;
		return () => `${now}-${index++}`;
	}
)();

/**
 * 根据点号分割的字符串或字符串数组从一个对象中取值
 * @param {Object} obj {a:[{b:'xx'}]}
 * @param {Srting,Array} prop a.0.b or ['a','0','b']
 */
export const getObjectValue = (obj, prop) => {
	let proArr;
	if (typeof prop === 'string') {
		proArr = prop.split('.');
	} else if (Array.isArray(prop)) {
		proArr = prop;
	} else {
		// console.error('getObjectValue  prop must be string or array');
		return undefined;
	}
	proArr = proArr.filter(i => i !== '');
	let value = obj;
	for (let i = 0; i < proArr.length; i++) {
		const p = proArr[i];
		value = value[p];
		if (value === undefined) {
			return undefined;
		}
		if (value === null ) {
			if (i === proArr.length - 1){
				return null;
			} else {
				return undefined;
			}
		}
	}
	return value;
};
/**
 * 设置formData数据
 * @param {Object} to 
 * @param {Object} from 
 */
export const setData = (to, from) => {
	for (let key in to) {
		if (from[key] !== undefined) {
			to[key] = from[key];
		}
	}
};
/**
 * 遍历树结构，fn一旦返回false就会停止遍历
 * @param {Array} tree 树结构
 * @param {Function} fn 对每个节点执行一遍fn方法 
 * @param {String} childrenKey  作为children的键
 */
export const treeForEach = (tree, fn, childrenKey = 'children') => {
	for (let i = 0; i < tree.length; i++) {
		if (fn(tree[i]) === false) return false;
		if (
			tree[i][childrenKey] 
			&& tree[i][childrenKey].length 
			&& treeForEach(tree[i][childrenKey], fn) === false
		) return false;
	}
};
/**
 * 从树结构里根据value找到第一个结点
 * @param {*} value 
 * @param {Array} tree [{label,value,children}]
 */
export const findNodeByValue = (tree, value) => {
	let result;
	treeForEach(tree, (node) => {
		if (node.value === value) {
			result = node;
			return false;
		}
	});
	return result;
};
/**
 * 从树结构里根据label找到第一个结点
 * @param {*} value 
 * @param {Array} tree [{label,value,children}]
 */
export const findNodeByLabel = (tree, label) => {
	let result;
	treeForEach(tree, (node) => {
		if (node.label === label) {
			result = node;
			return false;
		}
	});
	return result;
};
/**
 * 
 * @param {Array} tree [{label,value,children}]
 * @param {Object} option 
 * { 	
 * labelKey String 将转换为label的键  default:'label'	
 * valueKey String 将转换为value的键  default:'value'	
 * childrenKey String 将转换为children的键 default:'children'	
 * clean Boolean 是否剔除其余属性，default:true		
 * getValue Function 用于获取value的函数，传入当前节点,优先级高于valueKey default:undefind	
 * getLabel Function 用于获取label的函数，传入当前节点,优先级高于labelKey default:undefind	
 * getChildren Function 用于获取label的函数，传入当前节点,优先级高于childrenKey default:undefind					
 * deep Number 转化树结构的深度,为0时转化所有，默认为0 default:0				
 * }
 * @param {Array} result  目标数组，不用传 default:[]
 * 此方法不会修改原数据，会返回一个新的数组		
 * example:	  	
 * initTree(data, { labelKey: 'region_name', valueKey: 'national_code', childrenKey: 'childn_ational' })
 */
export const initTree = (tree, option, result = []) => {
	const { labelKey = 'label', valueKey = 'value', childrenKey = 'children', clean = true, getValue, getLabel, getChildren, deep = 0 } = option;
	for (let i = 0; i < tree.length; i++) {
		result[i] = {
			label: getLabel ? getLabel(tree[i]) : tree[i][labelKey],
			value: getValue ? getValue(tree[i]) : tree[i][valueKey],
		};
		if (!clean) {

			result[i] = { ...tree[i], ...result[i] }; 
		}
		const _children = getChildren ? getChildren(tree[i]) : tree[i][childrenKey];
		if (deep !== 1 && _children && _children.length) {
			result[i].children = [];
			initTree(
				_children, 
				deep > 1 ? { ...option, deep: option.deep - 1 } : option, 
				result[i].children
			);
		}
	}
	return result;
};

// 一些有趣的尝试
// 创建一个工作线程（Worker），传入js代码字符串或一个onmessage 的 function
export const createWorker = (workerString = "onmessage = function(e) { postMessage('msg from worker'+e.data); }") => {
	if (typeof workerString === 'function') {
		workerString = "onmessage = " + workerString.toString();
	}
	let blob = new Blob([workerString]);
	// Obtain a blob URL reference to our worker 'file'.
	let blobURL = window.URL.createObjectURL(blob);
	let worker = new Worker(blobURL);
	return worker;
};
// 深冻结
export const deepFreeze = (obj) => {
	const propNames = Object.getOwnPropertyNames(obj);
	propNames.forEach(function (name) {
	  const prop = obj[name];
	  if (typeof prop == 'object' && prop !== null) { deepFreeze(prop); }
	});
	return Object.freeze(obj);
};

// 等待 单位秒
export const sleep = (s = 0) => new Promise(r => setTimeout(r, s * 1000));

// 预加载图片
export const preloadImgs = (urls) => {  
	urls.forEach(url => {
		const img = new Image();
		img.src = url;
	});
}; 

const thousandRegex = /(\d)(?=(\d{3})+\.)/g;
/**
 * 
 * @param {Number,String} num   格式化目标
 * @param {Number} precision  精度
 * @param {String} prefix 前缀
 * @param {String} suffix 后缀
 */
export const getFormatNum = (num, precision = 2, prefix = '', suffix = '') => {
	let num2 = +num;
	if (isNaN(num2)) {
		num2 = 0;
		console.error('getFormatNum：不是一个数字或数字格式的字符串 ' + num);
		return num;
	}
	return prefix + num.toFixed(precision).replace(thousandRegex, '$1,') + suffix;
};
