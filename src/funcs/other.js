export const base642Blob = (base64Image, filename) => {

	// 处理前缀
	if (!(/data:image\/[^;]+;base64,/g.test(base64Image))) {
		base64Image += 'data:image/gif;base64,';
	}

	let arr = base64Image.split(',');
	let mime = arr[0].match(/:(.*?);/)[1];
	let bstr = atob(arr[1]);
	let n = bstr.length;
	let u8arr = new Uint8Array(n);
	while (n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	let file = new Blob([u8arr], { type: mime });
	file.name = filename;

	return file;
};

/**
 * canvas
 */
export const canvas2file = (canvas, opts = {}) => {
	const { filename = '____filename', getFile = false } = opts;
	// As base64
	const base64Image = canvas.toDataURL("image/png");
	// As a blob 移动端不兼容
	return new Promise((resolve, reject) => {
		let file;

		getFile && (file = base642Blob(base64Image, filename));

		resolve({ file, base64Image });
	});
};

/**
 * 用word方式计算正文字数
 * @param str 
 */
export const getWordsLength = (str) => {
	let sLen = 0;
	try {
		// 先将回车换行符做特殊处理
		str = str.replace(/(\r\n+|\s+|　+)/g, "龘");
		// 处理英文字符数字，连续字母、数字、英文符号视为一个单词
		str = str.replace(/[\x00-\xff]/g, "m");
		// 合并字符m，连续字母、数字、英文符号视为一个单词
		str = str.replace(/m+/g, "*");
		// 去掉回车换行符
		str = str.replace(/龘+/g, "");
		// 返回字数
		sLen = str.length;
	} catch (e){

	}
	return sLen;
};