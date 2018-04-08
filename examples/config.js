export const itemObj = {
	setCookie: {
		params: ['key', 'val', 'days', 'path', 'domain'],
		log: false
	},
	delCookie: {
		params: ['key', 'path', 'domain'],
		log: false
	},
	getCookie: {
		params: ['key'],
		log: true
	},
	setItem: {
		params: ['key', 'val', 'type'],
		log: false
	},
	delItem: {
		params: ['key', 'type'],
		log: false
	},
	getItem: {
		params: ['key', 'type'],
		log: true
	},
	getDevice: {
		params: [],
		log: true
	},
	getConstructUrl: {
		params: ['route'],
		log: true
	},
	getParseUrl: {
		params: ['windowHash'],
		log: true
	},
	getParseUrl: {
		params: ['url', 'paramObj'],
		log: true
	},
	getUrlParam: {
		params: ['key', 'urlInfo'],
		log: true
	},
	changeObjRegex: {
		params: ['rule'],
		log: false
	},
	dataValidity: {
		params: ['rule', 'value', 'callback'],
		log: true
	},
	getCroppedImg: {
		params: ['canvas', 'fileName', 'getFile'],
		log: true
	},
	defineProperty: {
		params: ['obj', 'key', 'value'],
		log: false
	},
	getFormatInputMoney: {
		params: ['string'],
		log: true
	},
	accAdd: {
		params: ['arg1', 'arg2'],
		log: true
	},
	accSub: {
		params: ['arg1', 'arg2'],
		log: true
	},
	accMul: {
		params: ['arg1', 'arg2'],
		log: true
	},
	accDiv: {
		params: ['arg1', 'arg2'],
		log: true
	}
};
export const itemArr = Object.keys(itemObj);