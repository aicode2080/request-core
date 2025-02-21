import axios from 'axios'
const md5 = require('md5');

const JreapService: any = axios.create({
    baseURL: "",
    timeout: 30000,
    headers: {
        'content-type': 'application/json;charset=utf-8',
        'x-requested-with': 'XMLHttpRequest',
        'jreap-header': 'dtxy',
        'cache-control': 'no-cache'
    }
})

//对字段进行加密
const getEncryptedHeader = (data: any) => {
    //提交前校验
    let timestamp = new Date().getTime();
    let nonce = Math.random().toString(36).substr(2, 15);
    let encryptedParam = getAscllJsonString(data);
    let md = md5(timestamp + nonce + encryptedParam + 'WRlci5KQ0VSU0FQcml2YXRlQ'); //md加密
    return JSON.stringify({
        timestamp: timestamp,
        nonce: nonce,
        signature: md,
    });
};

//对参数进行ascll编码排序
const getAscllJsonString = (args: any) => {
    if (Object.prototype.toString.call(args) !== '[object Object]') {
        return args;
    }
    let string = '';
    let keys = Object.keys(args);
    keys = keys.sort(); //参数名ASCII码从小到大排序（字典序）；
    let newArgs: any = {};
    keys.forEach(function (key) {
        if (Object.prototype.toString.call(args[key]) === '[object Object]') {
            newArgs[key] = getAscllJsonString(args[key]);
        } else if (Array.isArray(args[key])) {
            let str = '';
            args[key].forEach((item: any) => {
                str += getAscllJsonString(item) + '&';
            });

            newArgs[key] = str.substring(0, str.length - 1);
        } else if (args[key] != null && args[key] != 'null' && args[key] != 'undefined') {
            //如果参数的值为空不参与签名；
            newArgs[key] = args[key]; //参数名区分大小写；
        }
    });
    for (let k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);

    return string;
};



// 自定义信息提示窗口
const createMsgDom = (message: string, fn?: any) => {
    const msgDoms:any = document.querySelectorAll("div[name='jreap-core-message']")
    for (const d of msgDoms) {
        // 获取原top
        const oTop = d.getBoundingClientRect().top
        d.style.top = `${oTop + 45}px`;
    }
    const para = document.createElement("div");
    para.setAttribute("class", "ant-message");
    para.setAttribute("name", "jreap-core-message");
    para.innerHTML = `
        <span>
            <div class="ant-message-notice">
                <div class="ant-message-notice-content">
                    <div class="ant-message-custom-content ant-message-warning">
                        <i aria-label="icon: exclamation-circle" class="anticon anticon-exclamation-circle">
                            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
                            </svg>
                        </i>
                        <span>${message}</span>
                    </div>
                </div>
            </div>
        </span>
    `
    document.body.insertBefore(para, document.body.firstElementChild);
    setTimeout(function () {
        document.body.removeChild(para)
        if (fn) {
            fn()
        }
    }, 3000)
}

/**
 * 判断是否存在重复消息
 *
 * @return {*} 
 */
const isExistMsg = function () {
    var msgDoms = document.querySelectorAll("div[name='jreap-core-message']");
    if(msgDoms.length) return true;
    return false;
}

// request拦截器
JreapService.interceptors.request.use(
    (config: any) => {
        if (/get/i.test(config.method)) {
            //判断get请求
            config.params = config.params || {};
            config.params.t = Date.parse(new Date() as any) / 1000; //添加时间戳
        }
        config.headers['jreap-header'] = getEncryptedHeader(config.data);
        return config;
    },
    (error: any) => {
        console.log(error);
    }
);

// request拦截器
JreapService.interceptors.response.use(

    (response: any) => {
        let res = response.data;

        const { version, statusCode } = res
        const status = statusCode ? statusCode : (res.status ? res.status : '')
        var error = res.error ? res.error : (res.msg ? res.msg : '');
        const msg = res.message ? res.message : ((res.msg && res.msg != null && res.msg != "") ? res.msg : (res.error ? res.error : ''))
        const oldMsg = res.message ? res.message : ((res.msg && res.msg != null && res.msg != "") ? res.msg : (res.error ? res.error : ''))
        const attribute = res.attribute ? res.attribute : null

        const { flag, jsonArray } = res

        let isMsg = false;

        // 登录超时处理
        if (flag && flag == 'error' && res.errorCode && res.errorCode == '403') {
            if(!isExistMsg()) createMsgDom('您的登录已失效, 正在退出, 请稍后!');
            let loginPageUrl = JreapService.defaults.loginPageUrl ||response.config.loginPageUrl|| "/page/login/index.html";
            setTimeout(function () {
                top!.window.location.href = top!.window.location.origin + loginPageUrl + "?" + new Date().getTime();
            }, 3000)
            isMsg = true;
        }

        if (flag && flag == 'error' && res.statusCode && res.statusCode == '403') {
            if(!isExistMsg()) createMsgDom('您的登录已失效, 正在退出, 请稍后!');
            let loginPageUrl = JreapService.defaults.loginPageUrl || response.config.loginPageUrl|| "/page/login/index.html";
            setTimeout(function () {
                top!.window.location.href = top!.window.location.origin + loginPageUrl + "?" + new Date().getTime();
            }, 3000)
            isMsg = true;
        }

        // 账户禁用
        if (res.errorCode && res.errorCode == 'JR-300005') {
            createMsgDom('您的账户已被禁用或删除，系统将退出，请联系管理员！')
            let loginPageUrl = JreapService.defaults.loginPageUrl ||response.config.loginPageUrl|| "/page/login/index.html";
            setTimeout(function () {
                top!.window.location.href = top!.window.location.origin + loginPageUrl + "?" + new Date().getTime();
            }, 3000)
            isMsg = true;
        }

        // 账户禁用
        if (res.statusCode && res.statusCode == 'JR-300005') {
            createMsgDom('您的账户已被禁用或删除，系统将退出，请联系管理员！')
            let loginPageUrl = JreapService.defaults.loginPageUrl || response.config.loginPageUrl|| "/page/login/index.html";
            setTimeout(function () {
                top!.window.location.href = top!.window.location.origin + loginPageUrl + "?" + new Date().getTime();
            }, 3000)
            isMsg = true;
        }

        if (flag == 'error'  && !isMsg) {
            createMsgDom(error);
        }

        // 处理message里有换行符
        if (msg != '' && msg.indexOf('<br>') != -1) {
            res.message = msg.substring(0, msg.indexOf('<br>'))
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
        } else {
            let resData: any = {
                rows: res.rows ? res.rows : [],
                result: res.result ? res.result : {},
                page: {
                    current: res.currpage ? res.currpage : null,
                    totalpages: res.totalpages ? res.totalpages : null,
                    total: res.totalrecords ? res.totalrecords : null
                }
            };

            if (res.data) {
                resData = res.data
            } else if (res.result) {
                resData.result = res.result
            } else if (res.rows) {
                resData.rows = res.rows
            } else if (res instanceof Array) {
                resData.rows = res
            } else if (res.jsonArray instanceof Array) {
                resData.rows = res.jsonArray
            } else if (res.data instanceof Array) {
                resData.rows = res.data
            } else if (res.account) {
                resData.result = res
            } else if (res.applicationVersion) {
                resData.result = res
            } else if (res.success) {
                resData = {
                    result: res
                }
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
        return res
    },
    (error: any): any => {
        // 暴露error信息给业务自己处理
        if (JreapService.defaults.catchErrorFn && typeof JreapService.defaults.catchErrorFn === 'function') {
            JreapService.defaults.catchErrorFn(error)
            return
        }

        // 平台组错误统一处理方法
        if (error.message.includes('timeout')) {
            createMsgDom('请求超时，请稍候再试！');
            return Promise.reject(new Error(error))
        }
        if (error.response) {
            // 登录超时
            if (error.response.status === 403) {
                if(!isExistMsg()) createMsgDom('您的登录已失效, 正在退出, 请稍后!');
                let loginPageUrl = JreapService.defaults.loginPageUrl ||error.response.config.loginPageUrl|| "/page/login/index.html"
                setTimeout(function () {
                    top!.window.location.href = top!.window.location.origin + loginPageUrl + "?" + new Date().getTime();
                }, 3000)

            } else if (error.response.status === 404) {
                const contentType = error.response.headers['content-type'];
                const msg = '资源不存在！'

                if (contentType.indexOf('text/html') != -1) {
                    createMsgDom(`错误信息：${msg}`, () => {
                        window.location.href = "/404.html";
                    });
                }
                console.log(`错误信息：${error.response.config.url} ${msg}`)
                return Promise.reject(new Error(error));
            } else if (error.response.status === 400) {
                const msg = error.response.data && error.response.data.error ? error.response.data.error : '请求错误！'
                createMsgDom(`错误信息：${msg}`);

                return Promise.reject(new Error(error));
            } else if (error.response.status === 405) {
                console.log(`错误信息：${error.response.config.url} 请求的协议类型不支持！请设置正确的数据请求类型！`)

                return Promise.reject(new Error(error));
            } else if (error.response.status === 502) {
                const msg = error.response.data && error.response.data.error ? error.response.data.error : '服务器或网络错误！'
                createMsgDom(`错误信息：${msg}`)

                return Promise.reject(new Error(error));
            } else if (error.response.status === 504) {

            } else if (error.response.status === 500) {
                const msg = error.response.data && error.response.data.error ? error.response.data.error : '请求错误！'
                createMsgDom(`错误信息：${msg}`);

                return Promise.reject(new Error(error));
            }
        }

    }
)

export default JreapService