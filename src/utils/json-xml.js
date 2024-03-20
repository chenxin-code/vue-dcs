// https://www.ylefu.com/json/91852.html
export const jsonToXml = (json) => {
    const jsonObj = JSON.parse(json);
    let xml = '';
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            xml += '<' + key + '>';
            if (typeof (jsonObj[key]) === 'object') {
                xml += jsonToXml(jsonObj[key]);
            } else {
                xml += jsonObj[key];
            }
            xml += '</' + key + '>';
        }
    }
    return xml;
}
// https://blog.csdn.net/Twinkle_sone/article/details/131083255
export const XMLToJSON = (XMLData = "") => {
    let ind = 0,
        obj = {};
    const XMLParse = (obj = {}) => {
        let value = "",
            tag = "";
        //遍历xml字符串
        while (ind < XMLData.length) {
            //正在遍历标签内的值，记录标签名
            if (XMLData[ind] === "<" || (tag && XMLData[ind] !== ">")) {
                if (XMLData[ind] === "<") ind++;
                tag += XMLData[ind];
            } else if (XMLData[ind] === ">") {
                //获取到完整的标签名
                //通过rowNum属性来判断是否为数组，有rowNum属性的即为数组
                const rowNum = tag.split(" ")[1] || "";
                tag = tag.split(" ")[0];
                if (tag[0] !== "/") {
                    ind++;
                    //同一层级当前标签为出现过且不包含rowNum属性，将其处理为对象
                    if (obj[tag] === undefined && !rowNum.includes("rowNum")) {
                        obj[tag] = {};
                        const val = XMLParse(obj[tag], [tag]);
                        if (val) obj[tag] = val;
                        if (JSON.stringify(obj[tag]) === "{}") {
                            obj[tag] = "";
                        }
                    } else {
                        //同一层级下拥有多个同名标签或包含rowNum属性，将其处理为数组
                        if (obj[tag] === undefined) obj[tag] = [{}];
                        else if (Array.isArray(obj[tag])) obj[tag].push({});
                        else obj[tag] = [obj[tag], {}];
                        const objInd = obj[tag].length - 1;
                        //递归处理标签内的嵌套标签或提取值
                        const val = XMLParse(obj[tag][objInd]);
                        //有标签值的直接赋值，如：<a>111</a> -> {a:111}
                        if (val) obj[tag][objInd] = val;
                        //无子节点的赋空值
                        if (JSON.stringify(obj[tag][objInd]) === "{}") {
                            obj[tag][objInd] = "";
                        }
                    }
                } else {
                    //闭合标签，结束递归返回获取到的值
                    return value;
                }
                tag = "";
                value = "";
            } else {
                value += XMLData[ind];
            }
            ind++;
        }
    };
    XMLParse(obj);
    return obj;
};
export const JSONToXML = (JSONData = {}) => {
    if (!JSONData) return "";
    let res = "";
    const JSONParse = (obj) => {
        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                obj[key].forEach((item, index) => {
                    res += `<${key} rowNum="${index}">${item}</${key}>`;
                });
            } else if (typeof obj[key] === "object") {
                res += `<${key}>`;
                JSONParse(obj[key]);
                res += `</${key}>`;
            } else {
                res += `<${key}>${obj[key] || ""}</${key}>`;
            }
        }
    };
    JSONParse(JSONData);
    return res;
};

