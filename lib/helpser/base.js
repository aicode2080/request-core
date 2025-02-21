"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("./../core"));
var md5 = require('md5');
var RSA = require('rsa-js-java');
/**
 * 替换连接符
 * @param name
 * @param oldJoiner
 * @param newJoiner
 * @description 中划线和下划线连接符互换
 */
function getSimpleName(name, oldJoiner, newJoiner) {
    if (!name) {
        return {
            flag: "error",
            message: "名称不存在"
        };
    }
    var strs = name.split(oldJoiner);
    return strs.join(newJoiner);
}
exports.getSimpleName = getSimpleName;
/**
 * 获取session值
 * @param key
 * @description 获取session值
 */
function getSessionAttr(key) {
    if (sessionStorage && key) {
        return JSON.parse(sessionStorage.getItem(key));
    }
    return null;
}
exports.getSessionAttr = getSessionAttr;
/**
 * 设置session值
 * @param key
 * @description 设置session值
 */
function setSessionAttr(key, val) {
    if (sessionStorage && key) {
        // TODO 序列化
        if (val instanceof Object && JSON) {
            val = JSON.stringify(val);
        }
        sessionStorage.setItem(key, val);
    }
}
exports.setSessionAttr = setSessionAttr;
/**
 * 获取真实路径
 * @param url
 * @description 通过请求地址获取当前窗口真实的url地址
 */
function getRealPath(url) {
    if (url && url.indexOf("://") < 0) {
        return core_1.default.rootPath + url;
    }
    return url;
}
exports.getRealPath = getRealPath;
/**
 * 获取当前窗口name参数的值
 * @param name
 * @description 通过获取当前窗口的url获取url后的参数
 */
function getQueryVal(name) {
    var str = decodeURI(window.location.search);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = str.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    else {
        return null;
    }
}
exports.getQueryVal = getQueryVal;
/**
 * 添加cookie
 * @param name cookie名称
 * @param value cookie值
 * @param expiresHours 多少小时后过期,为0时不设定过期时间，即当浏览器关闭时cookie自动消失
 * @description 在浏览器中添加cookie
 */
function addCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    // 判断是否设置过期时间
    if (expiresHours && expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expiresHours * 60 * 60 * 1000);
        cookieString = cookieString + "; expires=" + date.toUTCString();
    }
    document.cookie = cookieString;
}
exports.addCookie = addCookie;
/**
 * 获取cookie
 * @param name cookie名称
 * @description 通过cookie名称获取cookie的值
 */
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return null;
}
exports.getCookie = getCookie;
/**
 * 删除cookie
 * @param name cookie名称
 * @description 通过cookie名称删除cookie
 */
function deleteCookie(name) {
    var date = new Date();
    var cval = getCookie(name);
    date.setTime(date.getTime() - 1);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + date.toUTCString();
    }
}
exports.deleteCookie = deleteCookie;
/**
 * 数组非空判断
 * @param arr 数组
 * @description 遍历数组，如果当前数组不为空，则返回true，并停止遍历。
 */
function objcetEmpty(arr) {
    var hasProp = false;
    for (var key in arr) {
        if (arr[key] && arr[key] != null) {
            hasProp = true;
        }
        break;
    }
    return hasProp;
}
exports.objcetEmpty = objcetEmpty;
/**
 * 删除数组中的空值
 * @param arr 数组
 * @description 遍历数组，如果当前值为空、null、undefined时，删除此值，并返回新的数组
 */
function deleteEmptyProperty(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (typeof (arr[i]) == 'string' && arr[i].match(/^[ ]*$/)) {
            arr.splice(i, 1);
            i = i - 1;
        }
        else {
            if (arr[i] == null || typeof (arr[i]) == "undefined") {
                arr.splice(i, 1);
                i = i - 1;
            }
        }
    }
    return arr;
}
exports.deleteEmptyProperty = deleteEmptyProperty;
/**
 * 删除数组中指定位置的值
 * @param arr 数组
 * @param index 需要删除的数值的下标，从0开始
 * @description 根据index删除数组元素，并返回新数组
 */
function delArrayByIndex(arr, index) {
    if (index < 0) {
        return arr;
    }
    else {
        return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
    }
}
exports.delArrayByIndex = delArrayByIndex;
/**
 * 查找当前节点是否有指定class的父元素
 * @param element 当前节点
 * @param parentClassName 父元素的class名称
 * @description 判断元素是否含有指定class的父元素
 */
function hasParent(element, parentClassName) {
    var parentNode = [];
    var isHasParent = false;
    if (element.parentNode) {
        parentNode.push(element.parentNode.className);
    }
    parentNode.forEach(function (item) {
        if (item && item.indexOf(parentClassName) != -1) {
            isHasParent = true;
            return;
        }
    });
    return isHasParent;
}
exports.hasParent = hasParent;
/**
 * 判断当前元素是否包含指定class
 * @param element 当前元素
 * @param className 指定的class名称
 */
function hasClassName(element, className) {
    var re = new RegExp('\\b' + className + '\\b');
    return re.test(element.className);
}
exports.hasClassName = hasClassName;
/**
 * 为当前元素增加指定class
 * @param element 当前元素
 * @param className 指定的class名称
 */
function addClassName(element, className) {
    if (!core_1.default.hasClassName(element, className)) {
        element.className = element.className == '' ? element.className : element.className + ' ' + className;
    }
}
exports.addClassName = addClassName;
/**
* 删除当前元素中指定class
* @param element 当前元素
* @param className 指定的class名称
*/
function removeClassName(element, className) {
    if (core_1.default.hasClassName(element, className)) {
        element.className = element.className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), "");
    }
}
exports.removeClassName = removeClassName;
/**
 * 创建tab选项卡（最外层框架）
 * @param id 对应的id名称
 * @param href 对应的链接地址
 * @param title 标签名称
 * @param urlType url地址的类型 "1"普通资源,"2"外部服务资源,"3"路由资源
 * @description 判断是否有标签，如果无则创建一个标签追加到page-tabs-content里，如果标签存在，但无相尖的iframe，则创建一个iframe追回到.content内容展示区
 */
function createTopMenu(id, href, title, urlType) {
    this.topMenu.next({
        id: id,
        url: href,
        name: title,
        urlType: urlType ? urlType : "1",
        type: "SAVE"
    });
}
exports.createTopMenu = createTopMenu;
/**
 * 删除tab选项卡（最外层框架）
 * @param id 对应的id名称
 * @param homepage 流程用，是否回到首页
 * @param urlType url地址的类型 "1"普通资源,"2"外部服务资源,"3"路由资源
 */
function deleteTopMenu(id, homepage, urlType) {
    this.topMenu.next({
        id: id,
        urlType: urlType ? urlType : "1",
        type: "DELETE",
        homepage: homepage === true ? true : false
    });
}
exports.deleteTopMenu = deleteTopMenu;
/**
 * 监听值的改变
 * @param name 名字
 * @param value 监听的值
 * @description 能过判断name来需要监听相对应的值的变化
 */
function monitorValue(name, value) {
    this.monitorChangeValue.next({
        name: name,
        value: value
    });
}
exports.monitorValue = monitorValue;
/**
 * 64位方法加密
 * @description 传入需要加密/解密的字符串进行加密/解密处理
 */
function Base64() {
    var _this = this;
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // 加密
    this.Base64.encode = function (text) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        text = _this.Base64._utf8_encode(text);
        while (i < text.length) {
            chr1 = text.charCodeAt(i++);
            chr2 = text.charCodeAt(i++);
            chr3 = text.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    };
    // 转译编码
    this.Base64.decode = function (text) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        text = text.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < text.length) {
            enc1 = keyStr.indexOf(text.charAt(i++));
            enc2 = keyStr.indexOf(text.charAt(i++));
            enc3 = keyStr.indexOf(text.charAt(i++));
            enc4 = keyStr.indexOf(text.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _this.Base64._utf8_decode(output);
        return output;
    };
    // 通过utf8加密
    this.Base64._utf8_encode = function (text) {
        text = text.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < text.length; n++) {
            var c = text.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    // 通过utf8解密
    this.Base64._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    return Base64;
}
exports.Base64 = Base64;
/**
* 时间格式处理
* @param fmt 格式
* @description 传入想要的时间格式
*/
function format(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
exports.format = format;
/**
* 换肤-body
* @description 在session中获取皮肤色，在当前的body上添加当前肤色样式
*/
function changeBodyTheme() {
    var loginInfo = core_1.default.getSessionAttr('loginInfo');
    var logintopicData = core_1.default.getSessionAttr('logintopicData');
    var skinId = (loginInfo && loginInfo.nowSkin) ? loginInfo.nowSkin.id : (logintopicData && logintopicData.skin) ? logintopicData.skin : 'blue';
    //const font =logintopicData && logintopicData.fontSize == "12" ? "fontSize-fontmin" : 'fontSize-fontlarge'
    var fontSize = null;
    if (loginInfo && loginInfo.fontSize) {
        fontSize = loginInfo && loginInfo.fontSize ? loginInfo.fontSize : 'fontSize-fontmin';
    }
    else {
        fontSize = logintopicData && logintopicData.fontSize == "16" ? 'fontSize-fontlarge' : "fontSize-fontmin";
    }
    var bodyClassArr = document.body.className.split(' ');
    var bodyClassFn = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf('skin-') !== -1) {
                arr.splice(i, 1);
                bodyClassFn(arr);
            }
            if (arr[i] && arr[i].indexOf('fontSize-') !== -1) {
                arr.splice(i, 1);
                bodyClassFn(arr);
            }
        }
    };
    bodyClassFn(bodyClassArr);
    document.body.className = bodyClassArr.join(' ') + (" skin-" + skinId) + (" " + fontSize);
}
exports.changeBodyTheme = changeBodyTheme;
/**
* 换肤
* @description 在当前的body和页面中所有的iframe的body上添加当前肤色样式
*/
function changeTheme() {
    // 获取body下所有的iframe
    var iframeList = document.getElementsByTagName('iframe');
    var loginInfo = core_1.default.getSessionAttr('loginInfo');
    var logintopicData = core_1.default.getSessionAttr('logintopicData');
    var nowSkin = (loginInfo && loginInfo.nowSkin) ? loginInfo.nowSkin.id : (logintopicData && logintopicData.skin) ? logintopicData.skin : 'blue';
    //const fontSize = loginInfo && loginInfo.fontSize ? loginInfo.fontSize : 'fontSize-fontmin'||logintopicData && logintopicData.fontSize == "12" ? "fontSize-fontmin" : 'fontSize-fontlarge';
    var fontSize = null;
    if (loginInfo && loginInfo.fontSize) {
        fontSize = loginInfo && loginInfo.fontSize ? loginInfo.fontSize : 'fontSize-fontmin';
    }
    else {
        fontSize = logintopicData && logintopicData.fontSize == "16" ? 'fontSize-fontlarge' : "fontSize-fontmin";
    }
    var skinClass = "skin-" + nowSkin;
    core_1.default.changeBodyTheme();
    // 使用递归遍历所有的iframe，并在其body上添加当前肤色class
    var iframeFn = function (skinClass, iframeList) {
        var _loop_1 = function () {
            //解决IE11浏览器因为ifreamItems[j].contentWindow.document产生的跨域问题
            try {
                var iframeTag = iframeList[i].contentWindow;
                var body = iframeTag.document.getElementsByTagName('body');
                if (body.length == 0)
                    return { value: void 0 };
                //找到iframe的body标签，加上肤色
                var _fbody = body[0];
                var fbodyClassNameArr = _fbody.className.split(' ');
                var bodyClassFn_1 = function (arr) {
                    for (var i_1 = 0; i_1 < arr.length; i_1++) {
                        if (arr[i_1].indexOf('skin-') !== -1) {
                            arr.splice(i_1, 1);
                            bodyClassFn_1(arr);
                        }
                        if (arr[i_1] && arr[i_1].indexOf('fontSize-') !== -1) {
                            arr.splice(i_1, 1);
                            bodyClassFn_1(arr);
                        }
                    }
                };
                bodyClassFn_1(fbodyClassNameArr);
                _fbody.className = fbodyClassNameArr.join(' ') + (" " + skinClass) + (" " + fontSize);
                // 判断iframe中是否还有ifame，如果有继续执行当前函数
                var iframeItems = iframeTag.document.getElementsByTagName('iframe');
                if (iframeItems && iframeItems.length > 0) {
                    iframeFn(skinClass, iframeItems);
                }
            }
            catch (e) {
                iframeList[i].src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close()})())";
            }
        };
        for (var i = 0; i < iframeList.length; i++) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    iframeFn(skinClass, iframeList);
}
exports.changeTheme = changeTheme;
/**
 * 页面超时判断函数
 * @description 老的kendo调用如果页面超时会调用此方法，用于react框架中的页面监听
 */
function resload() {
    this.isResload.next({
        isOverTime: true
    });
}
exports.resload = resload;
//对参数进行ascll编码排序
var getAscllJsonString = function (args) {
    if (Object.prototype.toString.call(args) !== '[object Object]') {
        return args;
    }
    var string = '';
    var keys = Object.keys(args);
    keys = keys.sort(); //参数名ASCII码从小到大排序（字典序）；
    var newArgs = {};
    keys.forEach(function (key) {
        if (Object.prototype.toString.call(args[key]) === '[object Object]') {
            newArgs[key] = getAscllJsonString(args[key]);
        }
        else if (Array.isArray(args[key])) {
            var str = "";
            args[key].forEach(function (item) {
                str += getAscllJsonString(item) + "&";
            });
            newArgs[key] = str.substring(0, str.length - 1);
        }
        else if (args[key] != null && args[key] != "null" && args[key] != 'undefined') { //如果参数的值为空不参与签名；
            newArgs[key] = args[key]; //参数名区分大小写；
        }
    });
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};
/**
 * 对字段进行md5加密
 * @description 将参数进行md5加密后，获取header的数据
 * @param data  传递给后台的参数
 * @param key   加密秘钥（可以和后台约定）
 */
exports.getEncryptedHeaderMd5 = function (data, key) {
    if (key === void 0) { key = "WRlci5KQ0VSU0FQcml2YXRlQ"; }
    //获取时间戳
    var timestamp = new Date().getTime();
    var nonce = Math.random().toString(36).substr(2, 15);
    var encryptedParam = getAscllJsonString(data);
    var md = md5(timestamp + nonce + encryptedParam + key); //md加密
    return {
        timestamp: timestamp,
        nonce: nonce,
        signature: md
    };
};
/**
 * RSA加密处理
 * @description 对参数进行RSA加密
 * @param publicKey  公共秘钥
 * @param data  encodeURIComponent转码后的参数，例encodeURIComponent(values.pwd)
 */
exports.getKey4RSA = function (publicKey, data) {
    var n = JSON.parse(publicKey);
    RSA.setMaxDigits(130);
    var o = new RSA.RSAKeyPair(n[0], n[1], n[2]);
    return RSA.encryptedString(o, data);
};
