

import { Base64 } from './base64.js'

import sm2 from './sm2.js'

import sm4 from './sm4.js'

// sm2  ------------------------

let publicKey = "04781bfb96962728db769c003e28348e264a4d7357bd7376d598555204f9239cdf9575340c031e408f01b111528d83c4c0a69d18b7ecb468b9fe06e450b670daf2"     // 后端生成后  提供给前端
// let privateKey = "5c2a7ff1b4df5c53168ff64419dbe440b24abf16183387843930a604d49d98c7"
export const encryptedSM2 = (string) => {  //加密
	return '04' + sm2.doEncrypt(Base64.encode(string), publicKey, 0)
}
export const decryptedSM2 = (string) => {  //解密
	return Base64.decode(sm2.doDecrypt(string.replace(/^04/, ''), privateKey, 0))
}
// sm4  --------------------------------------
// 加密
// const msg = 'hello world! 我是 juneandgreen.' // 可以为 utf8 串或字节数组
// const encryptKey = '0123456789abcdeffedcba9876543210' // 可以为 16 进制串或字节数组，要求为 128 比特
// let encryptData = sm4.encrypt(msg, getSm4Key()) // 加密，默认输出 16 进制字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
// let encryptData = sm4.encrypt(msg, key, {padding: 'none'}) // 加密，不使用 padding
// let encryptData = sm4.encrypt(msg, key, {padding: 'none', output: 'array'}) // 加密，不使用 padding，输出为字节数组
// let encryptData = sm4.encrypt(msg, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 加密，cbc 模式
export const encryptedSM4 = (data) => {  //加密
	let sm4Key = getSm4Key()     // 可以为 16 进制串或字节数组，要求为 128 比特
	return {
		data: sm4.encrypt(data, sm4Key),
		key: encryptedSM2(sm4Key + getDate2())
	}
}

// 解密
// const encryptData1 = '0e395deb10f6e8a17e17823e1fd9bd98a1bff1df508b5b8a1efb79ec633d1bb129432ac1b74972dbe97bab04f024e89c' // 可以为 16 进制串或字节数组
// const decryptKey = '0123456789abcdeffedcba9876543210' // 可以为 16 进制串或字节数组，要求为 128 比特

// let decryptData = sm4.decrypt(encryptData1, decryptKey) // 解密，默认输出 utf8 字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
// let decryptData = sm4.decrypt(encryptData, key, {padding: 'none'}) // 解密，不使用 padding
// let decryptData = sm4.decrypt(encryptData, key, {padding: 'none', output: 'array'}) // 解密，不使用 padding，输出为字节数组
// let decryptData = sm4.decrypt(encryptData, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 解密，cbc 模式

export const decryptedSM4 = (data, decryptKey) => {  //解密
	let sm4Key = decryptedSM2(decryptKey)
	return sm4.decrypt(data, sm4Key)
}

export const getSm4Key=(length = 32) =>{
	var str = 'ABCDEFabcdef2345678';
	var result = '';
	for (var i = length; i > 0; --i) {
		result += str[Math.floor(Math.random() * str.length)];
	}
	return result;
}


// 返回时间格式化 202101071700
export const getDate2 = () => {
	var date = new Date()
	if (!date) return ''
	var Y = date.getFullYear();
	var M = date.getMonth() + 1;
	M = M < 10 ? '0' + M : M;
	var D = date.getDate();
	D = D < 10 ? ('0' + D) : D;
	var hh = date.getHours();            //时
	hh = hh < 10 ? '0' + hh : hh;
	var mm = date.getMinutes();          //分
	mm = mm < 10 ? '0' + mm : mm;
	return `${Y}${M}${D}${hh}${mm}`
}


