"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var md5 = require('md5');
var JreapService = axios_1.default.create({
    baseURL: "",
    timeout: 30000,
    headers: {
        'content-type': 'application/json;charset=utf-8',
        'x-requested-with': 'XMLHttpRequest',
        'jreap-header': 'dtxy',
        'cache-control': 'no-cache'
    }
});
//对字段进行加密
var getEncryptedHeader = function (data) {
    //提交前校验
    var timestamp = new Date().getTime();
    var nonce = Math.random().toString(36).substr(2, 15);
    var encryptedParam = getAscllJsonString(data);
    var md = md5(timestamp + nonce + encryptedParam + 'WRlci5KQ0VSU0FQcml2YXRlQ'); //md加密
    return JSON.stringify({
        timestamp: timestamp,
        nonce: nonce,
        signature: md,
    });
};
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
            var str_1 = '';
            args[key].forEach(function (item) {
                str_1 += getAscllJsonString(item) + '&';
            });
            newArgs[key] = str_1.substring(0, str_1.length - 1);
        }
        else if (args[key] != null && args[key] != 'null' && args[key] != 'undefined') {
            //如果参数的值为空不参与签名；
            newArgs[key] = args[key]; //参数名区分大小写；
        }
    });
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};
// 自定义信息提示窗口
var createMsgDom = function (message, fn) {
    var msgDoms = document.querySelectorAll("div[name='jreap-core-message']");
    for (var _i = 0, msgDoms_1 = msgDoms; _i < msgDoms_1.length; _i++) {
        var d = msgDoms_1[_i];
        // 获取原top
        var oTop = d.getBoundingClientRect().top;
        d.style.top = oTop + 45 + "px";
    }
    var para = document.createElement("div");
    para.setAttribute("class", "ant-message");
    para.setAttribute("name", "jreap-core-message");
    para.innerHTML = "\n        <span>\n            <div class=\"ant-message-notice\">\n                <div class=\"ant-message-notice-content\">\n                    <div class=\"ant-message-custom-content ant-message-warning\">\n                        <i aria-label=\"icon: exclamation-circle\" class=\"anticon anticon-exclamation-circle\">\n                            <svg viewBox=\"64 64 896 896\" focusable=\"false\" class=\"\" data-icon=\"exclamation-circle\" width=\"1em\" height=\"1em\" fill=\"currentColor\" aria-hidden=\"true\">\n                                <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z\"></path>\n                            </svg>\n                        </i>\n                        <span>" + message + "</span>\n                    </div>\n                </div>\n            </div>\n        </span>\n    ";
    document.body.insertBefore(para, document.body.firstElementChild);
    setTimeout(function () {
        document.body.removeChild(para);
        if (fn) {
            fn();
        }
    }, 3000);
};
/**
 * 判断是否存在重复消息
 *
 * @return {*}
 */
var isExistMsg = function () {
    var msgDoms = document.querySelectorAll("div[name='jreap-core-message']");
    if (msgDoms.length)
        return true;
    return false;
};
// request拦截器
JreapService.interceptors.request.use(function (config) {
    if (/get/i.test(config.method)) {
        //判断get请求
        config.params = config.params || {};
        config.params.t = Date.parse(new Date()) / 1000; //添加时间戳
    }
    config.headers['jreap-header'] = getEncryptedHeader(config.data);
    return config;
}, function (error) {
    console.log(error);
});
// request拦截器
JreapService.interceptors.response.use(function (response) {
    var res = response.data;
    var version = res.version, statusCode = res.statusCode;
    var status = statusCode ? statusCode : (res.status ? res.status : '');
    var error = res.error ? res.error : (res.msg ? res.msg : '');
    var msg = res.message ? res.message : ((res.msg && res.msg != null && res.msg != "") ? res.msg : (res.error ? res.error : ''));
    var oldMsg = res.message ? res.message : ((res.msg && res.msg != null && res.msg != "") ? res.msg : (res.error ? res.error : ''));
    var attribute = res.attribute ? res.attribute : null;
    var flag = res.flag, jsonArray = res.jsonArray;
    var isMsg = false;
    // 登录超时处理
    if (flag && flag == 'error' && res.errorCode && res.errorCode == '403') {
        if (!isExistMsg())
            createMsgDom('您的登录已失效, 正在退出, 请稍后!');
        var loginPageUrl_1 = JreapService.defaults.loginPageUrl || response.config.loginPageUrl || "/page/login/index.html";
        setTimeout(function () {
            top.window.location.href = top.window.location.origin + loginPageUrl_1 + "?" + new Date().getTime();
        }, 3000);
        isMsg = true;
    }
    if (flag && flag == 'error' && res.statusCode && res.statusCode == '403') {
        if (!isExistMsg())
            createMsgDom('您的登录已失效, 正在退出, 请稍后!');
        var loginPageUrl_2 = JreapService.defaults.loginPageUrl || response.config.loginPageUrl || "/page/login/index.html";
        setTimeout(function () {
            top.window.location.href = top.window.location.origin + loginPageUrl_2 + "?" + new Date().getTime();
        }, 3000);
        isMsg = true;
    }
    // 账户禁用
    if (res.errorCode && res.errorCode == 'JR-300005') {
        createMsgDom('您的账户已被禁用或删除，系统将退出，请联系管理员！');
        var loginPageUrl_3 = JreapService.defaults.loginPageUrl || response.config.loginPageUrl || "/page/login/index.html";
        setTimeout(function () {
            top.window.location.href = top.window.location.origin + loginPageUrl_3 + "?" + new Date().getTime();
        }, 3000);
        isMsg = true;
    }
    // 账户禁用
    if (res.statusCode && res.statusCode == 'JR-300005') {
        createMsgDom('您的账户已被禁用或删除，系统将退出，请联系管理员！');
        var loginPageUrl_4 = JreapService.defaults.loginPageUrl || response.config.loginPageUrl || "/page/login/index.html";
        setTimeout(function () {
            top.window.location.href = top.window.location.origin + loginPageUrl_4 + "?" + new Date().getTime();
        }, 3000);
        isMsg = true;
    }
    if (flag == 'error' && !isMsg) {
        createMsgDom(error);
    }
    // 处理message里有换行符
    if (msg != '' && msg.indexOf('<br>') != -1) {
        res.message = msg.substring(0, msg.indexOf('<br>'));
    }
    // 数据结构处理
    if (flag && flag == 'error' || jsonArray && jsonArray == 'error') {
        res = {
            version: version ? version : null,
            flag: 'error',
            status: status,
            error: error,
            message: msg,
            oldMsg: oldMsg
        };
    }
    else {
        var resData = {
            rows: res.rows ? res.rows : [],
            result: res.result ? res.result : {},
            page: {
                current: res.currpage ? res.currpage : null,
                totalpages: res.totalpages ? res.totalpages : null,
                total: res.totalrecords ? res.totalrecords : null
            }
        };
        if (res.data) {
            resData = res.data;
        }
        else if (res.result) {
            resData.result = res.result;
        }
        else if (res.rows) {
            resData.rows = res.rows;
        }
        else if (res instanceof Array) {
            resData.rows = res;
        }
        else if (res.jsonArray instanceof Array) {
            resData.rows = res.jsonArray;
        }
        else if (res.data instanceof Array) {
            resData.rows = res.data;
        }
        else if (res.account) {
            resData.result = res;
        }
        else if (res.applicationVersion) {
            resData.result = res;
        }
        else if (res.success) {
            resData = {
                result: res
            };
        }
        res = {
            version: version ? version : null,
            flag: 'success',
            status: status,
            error: error,
            message: msg,
            oldMsg: oldMsg,
            attribute: attribute,
            data: resData
        };
    }
    return res;
}, function (error) {
    // 暴露error信息给业务自己处理
    if (JreapService.defaults.catchErrorFn && typeof JreapService.defaults.catchErrorFn === 'function') {
        JreapService.defaults.catchErrorFn(error);
        return;
    }
    // 平台组错误统一处理方法
    if (error.message.includes('timeout')) {
        createMsgDom('请求超时，请稍候再试！');
        return Promise.reject(new Error(error));
    }
    if (error.response) {
        // 登录超时
        if (error.response.status === 403) {
            if (!isExistMsg())
                createMsgDom('您的登录已失效, 正在退出, 请稍后!');
            var loginPageUrl_5 = JreapService.defaults.loginPageUrl || error.response.config.loginPageUrl || "/page/login/index.html";
            setTimeout(function () {
                top.window.location.href = top.window.location.origin + loginPageUrl_5 + "?" + new Date().getTime();
            }, 3000);
        }
        else if (error.response.status === 404) {
            var contentType = error.response.headers['content-type'];
            var msg = '资源不存在！';
            if (contentType.indexOf('text/html') != -1) {
                createMsgDom("\u9519\u8BEF\u4FE1\u606F\uFF1A" + msg, function () {
                    window.location.href = "/404.html";
                });
            }
            console.log("\u9519\u8BEF\u4FE1\u606F\uFF1A" + error.response.config.url + " " + msg);
            return Promise.reject(new Error(error));
        }
        else if (error.response.status === 400) {
            var msg = error.response.data && error.response.data.error ? error.response.data.error : '请求错误！';
            createMsgDom("\u9519\u8BEF\u4FE1\u606F\uFF1A" + msg);
            return Promise.reject(new Error(error));
        }
        else if (error.response.status === 405) {
            console.log("\u9519\u8BEF\u4FE1\u606F\uFF1A" + error.response.config.url + " \u8BF7\u6C42\u7684\u534F\u8BAE\u7C7B\u578B\u4E0D\u652F\u6301\uFF01\u8BF7\u8BBE\u7F6E\u6B63\u786E\u7684\u6570\u636E\u8BF7\u6C42\u7C7B\u578B\uFF01");
            return Promise.reject(new Error(error));
        }
        else if (error.response.status === 502) {
            var msg = error.response.data && error.response.data.error ? error.response.data.error : '服务器或网络错误！';
            createMsgDom("\u9519\u8BEF\u4FE1\u606F\uFF1A" + msg);
            return Promise.reject(new Error(error));
        }
        else if (error.response.status === 504) {
        }
        else if (error.response.status === 500) {
            var msg = error.response.data && error.response.data.error ? error.response.data.error : '请求错误！';
            createMsgDom("\u9519\u8BEF\u4FE1\u606F\uFF1A" + msg);
            return Promise.reject(new Error(error));
        }
    }
});
exports.default = JreapService;
