"use strict";
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
var index_1 = __importDefault(require("../api/index"));
/**
 * 接口请求共用函数 - 将废弃
 * @param params
 */
function getDataService(url, params, type, headers, paramType) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new index_1.default().getDataService(url, params, type, headers, paramType)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.getDataService = getDataService;
/**
 * 接口请求共用函数
 * @param params
 */
function requestService(param) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new index_1.default().requestService(param)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.requestService = requestService;
/**
 * 获得登录信息
 * @param service 服务
 */
function getLoginInfo(service, params, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {};
                    if (!this.getSessionAttr('loginInfo')) return [3 /*break*/, 1];
                    data = this.getSessionAttr('loginInfo');
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, new index_1.default().getLoginInfo(service, params, headers)];
                case 2:
                    data = _a.sent();
                    this.setSessionAttr("loginInfo", data);
                    _a.label = 3;
                case 3: return [2 /*return*/, new Promise(function (resolve) {
                        resolve(data);
                    })];
            }
        });
    });
}
exports.getLoginInfo = getLoginInfo;
/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
function getDictData(service, params) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {};
                    return [4 /*yield*/, new index_1.default().getDictData(service, params)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.getDictData = getDictData;
/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
function getDictTreeData(service, params) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {};
                    return [4 /*yield*/, new index_1.default().getDictTreeData(service, params)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.getDictTreeData = getDictTreeData;
/**
 * 获取机构树信息
 * @param parentId 当前流程id
 * @param isUnit
 */
function getOrgTree(service, params, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {};
                    return [4 /*yield*/, new index_1.default().getOrgTree(service, params, headers)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.getOrgTree = getOrgTree;
/**
 * 换肤请求
 * @param accountId 当前用户id
 * @param skinId 选择肤色id
 */
function postThemeInfo(service, params, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new index_1.default().postThemeInfo(service, params, headers)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.postThemeInfo = postThemeInfo;
/**
 * 修改密码
 * @param accountId 当前用户id
 * @param skinId 选择肤色id
 */
function postEditPassword(service, params, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new index_1.default().postEditPassword(service, params, headers)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.postEditPassword = postEditPassword;
/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
function getNavigation(service, params, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {};
                    return [4 /*yield*/, new index_1.default().getNavigation(service, params, headers)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            resolve(data);
                        })];
            }
        });
    });
}
exports.getNavigation = getNavigation;
