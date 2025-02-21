import { Jreap } from '../types'
import * as Base from '../helpser/base'
import * as System from '../helpser/systemInfo'
import { rootPath } from '../decorator'
import { Subject } from 'rxjs';
/**
 * 公共类库
 * @author tj
 * @description 平台公共方法和基本信息
 */

@rootPath
class jreap implements Jreap {
    about: string
    rootPath: string
	baseProj: string	// 基础数据服务
	jreapProj: string	// 4A中心
	bpmProj: string	//流程中心（老)
	wflowMgrProj: string	// 流程中心（新）- 管理控制台
    wflowDesignProj: string	// 流程中心（新）设计器
    getCreatTopMenu: object | null // 创建tab选项卡
    topMenu:any // 创建tab选项卡
    isResload: any  // 页面超时判断
    monitorChangeValue: any // 监听值的改变
    
    constructor(){
        this.about = "JReap基础js库";
        this.rootPath = "";
		this.baseProj = '/base/'; 
		this.jreapProj = '/jreap/';
		this.bpmProj ='/bpm/';
		this.wflowMgrProj = '/wflow-manager/';
        this.wflowDesignProj = '/wflow-design/';
        this.getCreatTopMenu = {};
        this.topMenu = new Subject<number>();
        this.isResload = new Subject<number>();
        this.monitorChangeValue = new Subject<number>();
    }

    // 共用请求方法-将废弃
    public getDataService = System.getDataService

    // 共用请求方法
    public requestService = System.requestService

    // 获取系统信息
    public getNavigation = System.getNavigation

    // 获取登录信息
    public getLoginInfo = System.getLoginInfo

    // 修改密码请求
    public postEditPassword = System.postEditPassword

    // 获取业务类型树信息-流程的旧使用
    public getDictData = System.getDictData

    // 获取业务类型树信息
    public getDictTreeData = System.getDictTreeData

    // 获取机构树信息
    public getOrgTree = System.getOrgTree

    // 换肤请求
    public postThemeInfo = System.postThemeInfo

    // 获取session信息
    public getSessionAttr = Base.getSessionAttr

    // 设置session信息
    public setSessionAttr = Base.setSessionAttr

    // '-'和'_'连接符互换
    public getSimpleName = Base.getSimpleName

    // 获取当前窗口真实的url地址
    public getRealPath = Base.getRealPath

    // 获取当前窗口name参数的值
    public getQueryVal = Base.getQueryVal

    // 设置cookie
    public addCookie = Base.addCookie

    // 获取cookie
    public getCookie = Base.getCookie

    // 删除cookie
    public deleteCookie = Base.deleteCookie

    // 数组非空判断
    public objcetEmpty = Base.objcetEmpty
    
    // 删除数组中的空值
    public deleteEmptyProperty = Base.deleteEmptyProperty

    // 删除数组中指定位置的值
    public delArrayByIndex = Base.delArrayByIndex

    // 查找某元素是否含有指定class名的父元素
    public hasParent = Base.hasParent

    // 判断当前元素是否包含指定class
    public hasClassName = Base.hasClassName

    // 为当前元素增加指定class
    public addClassName = Base.addClassName

    // 删除当前元素中指定class
    public removeClassName = Base.removeClassName

    // 64位加密处理
    public Base64 = Base.Base64

    // 时间格式处理
    public format = Base.format

    // iframe换肤函数
    public changeTheme = Base.changeTheme

    // 换肤函数
    public changeBodyTheme = Base.changeBodyTheme

    // 创建tab页面标签
    public createTopMenu = Base.createTopMenu

     // 删除tab页面标签
     public deleteTopMenu = Base.deleteTopMenu

    // 监听值的改变
    public monitorValue = Base.monitorValue

    // 页面超时判断
    public resload = Base.resload

    //参数进行md5加密
    public getEncryptedHeaderMd5 = Base.getEncryptedHeaderMd5

    //RSA加密处理
    public getKey4RSA = Base.getKey4RSA
    
}

const JReap = new jreap();
export default JReap