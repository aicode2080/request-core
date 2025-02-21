import { Joiner, Error, Jreapwindow } from '../types'
import JReap from "../core"

const md5=require('md5')
const RSA= require('rsa-js-java')
/**
 * 替换连接符
 * @param name 
 * @param oldJoiner 
 * @param newJoiner 
 * @description 中划线和下划线连接符互换
 */
export function getSimpleName(name: string, oldJoiner: Joiner, newJoiner: Joiner): Error | string {
    if (!name) {
        return {
            flag: "error",
            message: "名称不存在"
        };
    }
    const strs = name.split(oldJoiner);
    return strs.join(newJoiner);
}

/**
 * 获取session值
 * @param key 
 * @description 获取session值
 */
export function getSessionAttr(key: string): object | null {
    if (sessionStorage && key) {
        return JSON.parse(sessionStorage.getItem(key)!);
    }
    return null;
}

/**
 * 设置session值
 * @param key 
 * @description 设置session值
 */
export function setSessionAttr(key: string, val: any): void {
    if (sessionStorage && key) {
        // TODO 序列化
        if (val instanceof Object && JSON) {
            val = JSON.stringify(val);
        }
        sessionStorage.setItem(key, val);
    }
}

/**
 * 获取真实路径
 * @param url 
 * @description 通过请求地址获取当前窗口真实的url地址
 */
export function getRealPath(url: string): string {
    if (url && url.indexOf("://") < 0) {
        return JReap.rootPath + url;
    }
    return url;
}

/**
 * 获取当前窗口name参数的值
 * @param name 
 * @description 通过获取当前窗口的url获取url后的参数
 */
export function getQueryVal(name: string): string | null {
    var str = decodeURI(window.location.search);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = str.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}

/**
 * 添加cookie
 * @param name cookie名称
 * @param value cookie值
 * @param expiresHours 多少小时后过期,为0时不设定过期时间，即当浏览器关闭时cookie自动消失
 * @description 在浏览器中添加cookie
 */
export function addCookie(name: string, value: string, expiresHours?: number): void {
    let cookieString = name + "=" + escape(value);

    // 判断是否设置过期时间
    if (expiresHours && expiresHours > 0) {
        let date = new Date();
        date.setTime(date.getTime() + expiresHours * 60 * 60 * 1000);
        cookieString = cookieString + "; expires=" + date.toUTCString();
    }
    document.cookie = cookieString;
}

/**
 * 获取cookie
 * @param name cookie名称
 * @description 通过cookie名称获取cookie的值
 */
export function getCookie(name: string): string | null {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split("; ");
    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return null;
}

/**
 * 删除cookie
 * @param name cookie名称
 * @description 通过cookie名称删除cookie
 */
export function deleteCookie(name: string): void {
    var date = new Date();
    var cval = getCookie(name);

    date.setTime(date.getTime() - 1);

    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + date.toUTCString();
    }
}

/**
 * 数组非空判断
 * @param arr 数组
 * @description 遍历数组，如果当前数组不为空，则返回true，并停止遍历。
 */
export function objcetEmpty(arr: any[]): boolean {
    let hasProp = false;
    for (let key in arr) {
        if (arr[key] && arr[key] != null) {
            hasProp = true;
        }
        break;
    }
    return hasProp;
}

/**
 * 删除数组中的空值
 * @param arr 数组
 * @description 遍历数组，如果当前值为空、null、undefined时，删除此值，并返回新的数组
 */
export function deleteEmptyProperty(arr: any[]): any[] {
    for (let i = 0; i < arr.length; i++) {
        if (typeof (arr[i]) == 'string' && arr[i].match(/^[ ]*$/)) {
            arr.splice(i, 1);
            i = i - 1;
        } else {
            if (arr[i] == null || typeof (arr[i]) == "undefined") {
                arr.splice(i, 1);
                i = i - 1;
            }
        }
    }
    return arr;
}

/**
 * 删除数组中指定位置的值
 * @param arr 数组
 * @param index 需要删除的数值的下标，从0开始
 * @description 根据index删除数组元素，并返回新数组
 */
export function delArrayByIndex(arr: any[], index: number): any[] {
    if (index < 0) {
        return arr;
    } else {
        return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
    }
}


/**
 * 查找当前节点是否有指定class的父元素
 * @param element 当前节点
 * @param parentClassName 父元素的class名称
 * @description 判断元素是否含有指定class的父元素
 */
export function hasParent(element: any, parentClassName: string): boolean {
    let parentNode: any[] = []
    let isHasParent = false

    if (element.parentNode) {
        parentNode.push(element.parentNode.className)
    }

    parentNode.forEach((item: any) => {
        if (item && item.indexOf(parentClassName) != -1) {
            isHasParent = true;
            return
        }
    })
    return isHasParent;
}

/**
 * 判断当前元素是否包含指定class
 * @param element 当前元素
 * @param className 指定的class名称
 */
export function hasClassName(element: HTMLElement, className: string): boolean {
    let re = new RegExp('\\b' + className + '\\b');
    return re.test(element.className)
}

/**
 * 为当前元素增加指定class
 * @param element 当前元素
 * @param className 指定的class名称
 */
export function addClassName(element: HTMLElement, className: string): void {
    if (!JReap.hasClassName(element, className)) {
        element.className = element.className == '' ? element.className : element.className + ' ' + className
    }
}


/**
* 删除当前元素中指定class
* @param element 当前元素
* @param className 指定的class名称
*/
export function removeClassName(element: HTMLElement, className: string): void {
    if (JReap.hasClassName(element, className)) {
        element.className = element.className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), "")
    }
}


/**
 * 创建tab选项卡（最外层框架）
 * @param id 对应的id名称
 * @param href 对应的链接地址
 * @param title 标签名称
 * @param urlType url地址的类型 "1"普通资源,"2"外部服务资源,"3"路由资源
 * @description 判断是否有标签，如果无则创建一个标签追加到page-tabs-content里，如果标签存在，但无相尖的iframe，则创建一个iframe追回到.content内容展示区
 */
 export function createTopMenu(id: string, href: string, title: string, urlType?: string): void {
    this.topMenu.next({
        id: id,
        url: href,
        name: title,
        urlType: urlType ? urlType : "1",
        type: "SAVE"
    })
}

/**
 * 删除tab选项卡（最外层框架）
 * @param id 对应的id名称
 * @param homepage 流程用，是否回到首页
 * @param urlType url地址的类型 "1"普通资源,"2"外部服务资源,"3"路由资源
 */
export function deleteTopMenu(id: string, homepage?: boolean, urlType?: string): void {
    this.topMenu.next({
        id: id,
        urlType: urlType ? urlType : "1",
        type: "DELETE",
        homepage: homepage === true ? true : false
    })
}
/**
 * 监听值的改变
 * @param name 名字
 * @param value 监听的值
 * @description 能过判断name来需要监听相对应的值的变化
 */
export function monitorValue(name: string, value: any): void {
    this.monitorChangeValue.next({
        name,
        value
    })
}

/**
 * 64位方法加密
 * @description 传入需要加密/解密的字符串进行加密/解密处理
 */
export function Base64(): any {

    let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

    // 加密
    this.Base64.encode = (text: string) => {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        text = this.Base64._utf8_encode(text);
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
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }

    // 转译编码
    this.Base64.decode = (text: string) => {
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
        output = this.Base64._utf8_decode(output);
        return output;
    }

    // 通过utf8加密
    this.Base64._utf8_encode = (text: string) => {
        text = text.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < text.length; n++) {
            var c = text.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // 通过utf8解密
    this.Base64._utf8_decode = (utftext: string) => {
        var string = "";
        var i = 0;
        var c = 0,
            c2 = 0,
            c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
    return Base64;
}

/**
* 时间格式处理
* @param fmt 格式
* @description 传入想要的时间格式
*/
export function format(date: Date, fmt: string): string {
    var o: any = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
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


/**
* 换肤-body
* @description 在session中获取皮肤色，在当前的body上添加当前肤色样式
*/
export function changeBodyTheme(): void {
    const loginInfo: any = JReap.getSessionAttr('loginInfo')
    const logintopicData: any = JReap.getSessionAttr('logintopicData')
    const skinId = (loginInfo && loginInfo.nowSkin) ? loginInfo.nowSkin.id : (logintopicData &&  logintopicData.skin)? logintopicData.skin : 'blue';
    //const font =logintopicData && logintopicData.fontSize == "12" ? "fontSize-fontmin" : 'fontSize-fontlarge'
    let fontSize:any= null;
    if(loginInfo && loginInfo.fontSize){
        fontSize = loginInfo && loginInfo.fontSize ? loginInfo.fontSize : 'fontSize-fontmin';
    }else{
        fontSize = logintopicData && logintopicData.fontSize == "16" ? 'fontSize-fontlarge':"fontSize-fontmin" 

    }
    const bodyClassArr: string[] = document.body.className.split(' ')

    const bodyClassFn = (arr: any[]) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].indexOf('skin-') !== -1) {
                arr.splice(i, 1)

                bodyClassFn(arr)
            }
            if (arr[i] && arr[i].indexOf('fontSize-') !== -1) {
                arr.splice(i, 1);
                bodyClassFn(arr);
            }
        }
    }

    bodyClassFn(bodyClassArr)

    document.body.className = bodyClassArr.join(' ') + (" skin-" + skinId) + ` ${fontSize}`;
}

/**
* 换肤
* @description 在当前的body和页面中所有的iframe的body上添加当前肤色样式
*/
export function changeTheme(): void {
    // 获取body下所有的iframe
    const iframeList = document.getElementsByTagName('iframe')
    const loginInfo: any = JReap.getSessionAttr('loginInfo')
    const logintopicData: any = JReap.getSessionAttr('logintopicData')
    const nowSkin = (loginInfo && loginInfo.nowSkin) ? loginInfo.nowSkin.id : (logintopicData &&  logintopicData.skin) ? logintopicData.skin : 'blue';
    //const fontSize = loginInfo && loginInfo.fontSize ? loginInfo.fontSize : 'fontSize-fontmin'||logintopicData && logintopicData.fontSize == "12" ? "fontSize-fontmin" : 'fontSize-fontlarge';
    let fontSize:any= null;
    if(loginInfo && loginInfo.fontSize){
        fontSize = loginInfo && loginInfo.fontSize ? loginInfo.fontSize : 'fontSize-fontmin';
    }else{
        fontSize =logintopicData && logintopicData.fontSize == "16" ? 'fontSize-fontlarge':"fontSize-fontmin"

    }
    const skinClass = `skin-${nowSkin}`

    JReap.changeBodyTheme()

    // 使用递归遍历所有的iframe，并在其body上添加当前肤色class
    const iframeFn = (skinClass: string, iframeList: any) => {
        for (var i = 0; i < iframeList.length; i++) {
            //解决IE11浏览器因为ifreamItems[j].contentWindow.document产生的跨域问题
            try {
                const iframeTag = iframeList[i].contentWindow
                const body = iframeTag.document.getElementsByTagName('body')

                if (body.length == 0) return

                //找到iframe的body标签，加上肤色
                const _fbody = body[0];
                const fbodyClassNameArr = _fbody.className.split(' ')

                const bodyClassFn = (arr: any[]) => {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].indexOf('skin-') !== -1) {
                            arr.splice(i, 1)

                            bodyClassFn(arr)
                        }
                        if (arr[i] && arr[i].indexOf('fontSize-') !== -1) {
                            arr.splice(i, 1);
                            bodyClassFn(arr);
                        }
                    }
                }

                bodyClassFn(fbodyClassNameArr)
                _fbody.className = fbodyClassNameArr.join(' ') + (" " + skinClass) + ` ${fontSize}`;

                // 判断iframe中是否还有ifame，如果有继续执行当前函数
                const iframeItems = iframeTag.document.getElementsByTagName('iframe');
                if (iframeItems && iframeItems.length > 0) {
                    iframeFn(skinClass, iframeItems)
                }
            } catch (e) {
                iframeList[i].src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close()})())";
            }
        }
    }
    iframeFn(skinClass, iframeList)
}


/**
 * 页面超时判断函数
 * @description 老的kendo调用如果页面超时会调用此方法，用于react框架中的页面监听
 */
export function resload(): void {
    this.isResload.next({
        isOverTime: true
    })
}

//对参数进行ascll编码排序
const getAscllJsonString = (args:any) => {
    if(Object.prototype.toString.call(args) !== '[object Object]'){
        return args
    }
    var string = ''
    var keys = Object.keys(args)
    keys = keys.sort() //参数名ASCII码从小到大排序（字典序）；
    var newArgs:any = {}
    keys.forEach(function (key) {
        if (Object.prototype.toString.call(args[key]) === '[object Object]') {
            newArgs[key] = getAscllJsonString(args[key])
        } else
            if (Array.isArray(args[key])) {
                var str = ""
                args[key].forEach((item:any) => {
                    str += getAscllJsonString(item) + "&"
                });
                
                newArgs[key] = str.substring(0, str.length - 1)

            } else
                if (args[key] != null && args[key] != "null" && args[key] != 'undefined') {  //如果参数的值为空不参与签名；
                    newArgs[key] = args[key]  //参数名区分大小写；
                }

    })
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1)

    return string
}

/**
 * 对字段进行md5加密
 * @description 将参数进行md5加密后，获取header的数据
 * @param data  传递给后台的参数
 * @param key   加密秘钥（可以和后台约定）
 */
export const getEncryptedHeaderMd5 = (data:any,key:string = "WRlci5KQ0VSU0FQcml2YXRlQ") => {
    //获取时间戳
    let timestamp = new Date().getTime()
    let nonce = Math.random().toString(36).substr(2, 15)
    let encryptedParam = getAscllJsonString(data)
    let md = md5(timestamp + nonce + encryptedParam + key)//md加密
    return {
        timestamp: timestamp,
        nonce: nonce,
        signature: md
    }
}

/**
 * RSA加密处理
 * @description 对参数进行RSA加密
 * @param publicKey  公共秘钥
 * @param data  encodeURIComponent转码后的参数，例encodeURIComponent(values.pwd)
 */
export const getKey4RSA = (publicKey: any, data: string) =>{
    var n = JSON.parse(publicKey);
    RSA.setMaxDigits(130);
    var o = new RSA.RSAKeyPair(n[0],n[1],n[2]);
    return RSA.encryptedString(o, data)
}
