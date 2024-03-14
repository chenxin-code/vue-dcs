/**
 * 工具类
 */
import CryptoJS from 'crypto-js'
import crypto from 'crypto'
let keyStr = "szzhcopzxcvbnmas"
const keyStr2 = 'QZPM1029WXON3847'
//加密
export function encrypt(word, keyStr){ 
// export function encrypt(word){ 
	var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	return encrypted.toString();
}
export function encryptGcm(word,keyStr) {
	const iv = crypto.randomBytes(12)
	const cipher = crypto.createCipheriv('aes-128-gcm', keyStr, iv)
	const encrypted = cipher.update(word, 'utf8')
	const end = cipher.final()
	const tag = cipher.getAuthTag()
	const res = Buffer.concat([iv, encrypted, end, tag])
	return res.toString('base64')
  }
  
//解密
// export function decrypt(word, keyStr){  
export function decrypt(word,keyStr){  
	var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
	var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

export function decrypt2(data) {
	var bData = Buffer.from(data, 'base64')
	const iv = bData.slice(0, 12)
	const tag = bData.slice(-16)
	const cdata = bData.slice(12, bData.length - 16)
	const decipher = crypto.createDecipheriv('aes-256-gcm', keyStr2, iv)
	decipher.setAuthTag(tag)
	var msg = decipher.update(cdata)
	const fin = decipher.final()
	const decryptedStr = new TextDecoder('utf8').decode(Buffer.concat([msg, fin]))
	return decryptedStr
  }