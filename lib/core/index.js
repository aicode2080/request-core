"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base = __importStar(require("../helpser/base"));
var System = __importStar(require("../helpser/systemInfo"));
var decorator_1 = require("../decorator");
var rxjs_1 = require("rxjs");
/**
 * 公共类库
 * @author tj
 * @description 平台公共方法和基本信息
 */
var jreap = /** @class */ (function () {
    function jreap() {
        // 共用请求方法-将废弃
        this.getDataService = System.getDataService;
        // 共用请求方法
        this.requestService = System.requestService;
        // 获取系统信息
        this.getNavigation = System.getNavigation;
        // 获取登录信息
        this.getLoginInfo = System.getLoginInfo;
        // 修改密码请求
        this.postEditPassword = System.postEditPassword;
        // 获取业务类型树信息-流程的旧使用
        this.getDictData = System.getDictData;
        // 获取业务类型树信息
        this.getDictTreeData = System.getDictTreeData;
        // 获取机构树信息
        this.getOrgTree = System.getOrgTree;
        // 换肤请求
        this.postThemeInfo = System.postThemeInfo;
        // 获取session信息
        this.getSessionAttr = Base.getSessionAttr;
        // 设置session信息
        this.setSessionAttr = Base.setSessionAttr;
        // '-'和'_'连接符互换
        this.getSimpleName = Base.getSimpleName;
        // 获取当前窗口真实的url地址
        this.getRealPath = Base.getRealPath;
        // 获取当前窗口name参数的值
        this.getQueryVal = Base.getQueryVal;
        // 设置cookie
        this.addCookie = Base.addCookie;
        // 获取cookie
        this.getCookie = Base.getCookie;
        // 删除cookie
        this.deleteCookie = Base.deleteCookie;
        // 数组非空判断
        this.objcetEmpty = Base.objcetEmpty;
        // 删除数组中的空值
        this.deleteEmptyProperty = Base.deleteEmptyProperty;
        // 删除数组中指定位置的值
        this.delArrayByIndex = Base.delArrayByIndex;
        // 查找某元素是否含有指定class名的父元素
        this.hasParent = Base.hasParent;
        // 判断当前元素是否包含指定class
        this.hasClassName = Base.hasClassName;
        // 为当前元素增加指定class
        this.addClassName = Base.addClassName;
        // 删除当前元素中指定class
        this.removeClassName = Base.removeClassName;
        // 64位加密处理
        this.Base64 = Base.Base64;
        // 时间格式处理
        this.format = Base.format;
        // iframe换肤函数
        this.changeTheme = Base.changeTheme;
        // 换肤函数
        this.changeBodyTheme = Base.changeBodyTheme;
        // 创建tab页面标签
        this.createTopMenu = Base.createTopMenu;
        // 删除tab页面标签
        this.deleteTopMenu = Base.deleteTopMenu;
        // 监听值的改变
        this.monitorValue = Base.monitorValue;
        // 页面超时判断
        this.resload = Base.resload;
        //参数进行md5加密
        this.getEncryptedHeaderMd5 = Base.getEncryptedHeaderMd5;
        //RSA加密处理
        this.getKey4RSA = Base.getKey4RSA;
        this.about = "JReap基础js库";
        this.rootPath = "";
        this.baseProj = '/base/';
        this.jreapProj = '/jreap/';
        this.bpmProj = '/bpm/';
        this.wflowMgrProj = '/wflow-manager/';
        this.wflowDesignProj = '/wflow-design/';
        this.getCreatTopMenu = {};
        this.topMenu = new rxjs_1.Subject();
        this.isResload = new rxjs_1.Subject();
        this.monitorChangeValue = new rxjs_1.Subject();
    }
    jreap = __decorate([
        decorator_1.rootPath
    ], jreap);
    return jreap;
}());
var JReap = new jreap();
exports.default = JReap;
