"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = require("../decorator");
var service_1 = __importDefault(require("./service"));
var qs = require('qs');
var formType = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
};
/**
 * 公共API
 */
var JreapBaseConfigApi = /** @class */ (function () {
    function JreapBaseConfigApi() {
    }
    /**
     * 异步请求数据接口
     * @param url 接口地址
     * @param params 参数集
     * @param type 请求类型
     * @param headers 请求的头部信息
     */
    JreapBaseConfigApi.prototype.getDataService = function (url, params, type, headers, paramType) {
        return __awaiter(this, void 0, void 0, function () {
            var newParams;
            return __generator(this, function (_a) {
                if (paramType == 'parse') {
                    newParams = qs.parse(params);
                }
                else {
                    newParams = qs.stringify(params);
                }
                if (type == 'GET') {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            service_1.default.get(url + "?" + qs.stringify(params)).then(function (res) {
                                resolve(res);
                            }).catch(function (error) {
                                reject(error);
                            });
                        })];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        service_1.default.post(url, newParams, headers ? { headers: headers } : {}).then(function (res) {
                            resolve(res);
                        }).catch(function (error) {
                            reject(error);
                        });
                    })];
            });
        });
    };
    /**
     * 异步请求数据接口-升级版
     * 扩展提供超时及错误信息处理函数
     */
    JreapBaseConfigApi.prototype.requestService = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var url, params, method, headers, paramType, timeout, catchErrorFn, loginPageUrl, newParams;
            return __generator(this, function (_a) {
                url = param.url, params = param.params, method = param.method, headers = param.headers, paramType = param.paramType, timeout = param.timeout, catchErrorFn = param.catchErrorFn, loginPageUrl = param.loginPageUrl;
                // 业务自行处理错误返回的函数
                service_1.default.defaults.catchErrorFn = catchErrorFn;
                // 业务自定义的登录页面地址
                service_1.default.defaults.loginPageUrl = loginPageUrl;
                if (method && method == 'GET') {
                    newParams = qs.stringify(params);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            service_1.default.get(url + "?" + newParams, { timeout: timeout }).then(function (res) {
                                resolve(res);
                            }).catch(function (error) {
                                reject(error);
                            });
                        })];
                }
                else {
                    if (paramType && paramType !== '') {
                        newParams = qs[paramType](params);
                    }
                    else {
                        newParams = qs.parse(params);
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            service_1.default.post(url, newParams, { headers: headers, timeout: timeout }).then(function (res) {
                                resolve(res);
                            }).catch(function (error) {
                                reject(error);
                            });
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 系统信息
     * @param service 接口所属系统
     * @description 获取系统相关信息
     */
    JreapBaseConfigApi.prototype.getNavigation = function (service, params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        service_1.default.post(service, qs.stringify(params[0]), headers ? { headers: headers } : {}).then(function (res) {
                            resolve(res);
                        });
                    })];
            });
        });
    };
    /**
     * 登录信息
     * @param service 服务
     */
    JreapBaseConfigApi.prototype.getLoginInfo = function (service, params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        service_1.default.post(service, qs.stringify(params[0]), headers ? { headers: headers } : {}).then(function (res) {
                            resolve(res.data.result);
                        });
                    })];
            });
        });
    };
    /**
     * 修改密码
     * @param service 服务
     */
    JreapBaseConfigApi.prototype.postEditPassword = function (service, params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        service_1.default.post(service, qs.stringify(params[0]), headers ? { headers: headers } : formType).then(function (res) {
                            resolve(res);
                        });
                    })];
            });
        });
    };
    /**
     * 换肤
     * @param accountId 当前用户id
     * @param skinId 选择肤色id
     * @param service 服务
     */
    JreapBaseConfigApi.prototype.postThemeInfo = function (service, params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        service_1.default.post(service, qs.stringify(params[0]), headers ? { headers: headers } : formType).then(function (res) {
                            resolve(res);
                        });
                    })];
            });
        });
    };
    /**
     * 获得业务类型树信息
     * @param service 服务
     * @param code  业务类型码
     */
    JreapBaseConfigApi.prototype.getDictData = function (service, params) {
        return __awaiter(this, void 0, void 0, function () {
            var trees, markData;
            return __generator(this, function (_a) {
                trees = [];
                markData = sessionStorage.getItem(params[0].mark);
                markData = JSON.parse(markData);
                return [2 /*return*/, new Promise(function (resolve) {
                        if (markData && Array.isArray(markData)) {
                            resolve(markData);
                        }
                        else {
                            service_1.default.get(service + '?' + qs.stringify(params[0])).then(function (res) {
                                if (res && res.data && res.data.length > 0) {
                                    res.data.forEach(function (item) {
                                        trees.push({
                                            id: item.id,
                                            pId: item.parentId,
                                            title: item.name,
                                            value: item.value,
                                            mark: item.mark,
                                            refObj: item
                                        });
                                    });
                                    sessionStorage.setItem(params[0].mark, JSON.stringify(trees));
                                }
                                resolve(trees);
                            });
                        }
                    })];
            });
        });
    };
    /**
     * 获得业务类型树信息
     * @param service 服务
     * @param code  业务类型码
     */
    JreapBaseConfigApi.prototype.getDictTreeData = function (service, params) {
        return __awaiter(this, void 0, void 0, function () {
            var trees, markData;
            return __generator(this, function (_a) {
                trees = [];
                markData = sessionStorage.getItem(params[0].mark);
                markData = JSON.parse(markData);
                return [2 /*return*/, new Promise(function (resolve) {
                        if (markData && Array.isArray(markData)) {
                            resolve(markData);
                        }
                        else {
                            service_1.default.get(service + '?' + qs.stringify(params[0])).then(function (res) {
                                if (res && res.data && res.data.length > 0) {
                                    res.data.forEach(function (item) {
                                        trees.push({
                                            id: item.id,
                                            pId: item.parentId,
                                            title: item.name,
                                            value: item.value,
                                            mark: item.mark,
                                            refObj: item
                                        });
                                    });
                                    sessionStorage.setItem(params[0].mark, JSON.stringify(trees));
                                }
                                resolve(trees);
                            });
                        }
                    })];
            });
        });
    };
    /**
     * 获取机构树信息
     * @param id 当前流程id
     * @param isUnit
     */
    JreapBaseConfigApi.prototype.getOrgTree = function (service, params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var trees;
            return __generator(this, function (_a) {
                trees = [];
                return [2 /*return*/, new Promise(function (resolve) {
                        service_1.default.post(service, qs.stringify(params[0]), headers ? { headers: headers } : formType).then(function (res) {
                            if (res && res.data) {
                                res.data.rows.forEach(function (item) {
                                    trees.push({
                                        id: item.id,
                                        pId: params[0].id,
                                        title: item.name,
                                        value: item.target.code,
                                        isLeaf: !item.hasChild,
                                        refObj: item
                                    });
                                });
                                resolve(trees);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    })];
            });
        });
    };
    __decorate([
        decorator_1.urlSet("web/pubvariable/getVariable.form")
    ], JreapBaseConfigApi.prototype, "getNavigation", null);
    __decorate([
        decorator_1.urlSet("web/right/auth/loginInfo.form")
    ], JreapBaseConfigApi.prototype, "getLoginInfo", null);
    __decorate([
        decorator_1.urlSet("web/right/accountManager/changePassword.form")
    ], JreapBaseConfigApi.prototype, "postEditPassword", null);
    __decorate([
        decorator_1.urlSet("web/right/auth/saveSkin.form")
    ], JreapBaseConfigApi.prototype, "postThemeInfo", null);
    __decorate([
        decorator_1.urlSet("web/code/query.form")
    ], JreapBaseConfigApi.prototype, "getDictData", null);
    __decorate([
        decorator_1.urlSet("web/code/query.form")
    ], JreapBaseConfigApi.prototype, "getDictTreeData", null);
    __decorate([
        decorator_1.urlSet("web/right/util/findOrgTree.form")
    ], JreapBaseConfigApi.prototype, "getOrgTree", null);
    return JreapBaseConfigApi;
}());
exports.default = JreapBaseConfigApi;
