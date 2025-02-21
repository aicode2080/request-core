export declare type Joiner = '_' | '-';
/**
 * 错误接口
 * @param flag 错误标识
 * @param message 错误信息
 * @param errorCode 错误编码
 */
export interface Error {
    flag: string;
    message: string;
    errorCode?: number;
}
/**
 * 基础返回数据接口
 * @param flag 错误
 * @param error 错误
 * @param status
 * @param error 错误代码
 * @param message 消息
 * @param data 数据
 */
export interface BaseEntity {
    version?: string;
    flag: string;
    status: number;
    error: number;
    message: string;
    data?: object;
}
/**
 * @param about 版本信息
 * @param rootPath 根路径
 * @method getSessionAttr 获得session属性
 * @method getLoginInfo 获取登录信息
 * @method getSimpleName 替换连接符
 * @method postThemeInfo 换肤请求
 * @method postEditPassword 修改密码
 * @method requestService 通用请求方式
 * @method getDataService 通用请求方式 - 将废弃
 * @method getNavigation 获取系统信息
 */
export interface Jreap {
    about: string;
    rootPath: string;
    getSessionAttr(key: string): object | null;
    setSessionAttr(key: string, val: any): void;
    getSimpleName(name: string, oldJoiner: Joiner, newJoiner: Joiner): Error | string;
    getRealPath(url: string): string;
    getQueryVal(name: string): string | null;
    addCookie(name: string, value: string, expiresHours?: number): void;
    getCookie(name: string): string | null;
    deleteCookie(name: string): void;
    objcetEmpty(arr: any[]): boolean;
    deleteEmptyProperty(arr: any[]): any[];
    delArrayByIndex(arr: any[], index: number): any[];
    hasParent(element: any, parentClassName: string): boolean;
    hasClassName(element: HTMLElement, className: string): boolean;
    addClassName(element: HTMLElement, className: string): void;
    removeClassName(element: HTMLElement, className: string): void;
    Base64(): any;
    format(date: Date, fmt: string): string;
    changeTheme(): void;
    changeBodyTheme(): void;
    resload(): void;
    getLoginInfo(service: string, params?: object, headers?: any): Promise<LoginEntity | object>;
    getDataService(url: string, params: object, type?: string, headers?: object, paramType?: string): Promise<any>;
    requestService(param: ParamsEntity): Promise<any>;
    postEditPassword(service: string, params: object, headers?: any): Promise<object | BaseEntity>;
    postThemeInfo(service: string, params?: object, headers?: any): Promise<object | BaseEntity[]>;
    getDictData(service: string, params: object): Promise<object | TreeEntity[] | BaseEntity>;
    getDictTreeData(service: string, params: any): Promise<object | TreeEntity[] | BaseEntity>;
    getOrgTree(service: string, params: object, headers?: any): Promise<object | TreeEntity[] | BaseEntity>;
    getNavigation(service: string, params?: object, headers?: any): Promise<object | VariableEntity>;
    getEncryptedHeaderMd5(data: any, key: string): any;
    getKey4RSA(publicKey: any, data: string): any;
}
export interface Jreapwindow extends Window {
    coloseMenu(): void;
    tabActive(): void;
}
/**
 * 登录信息结果
 */
export interface LoginEntity extends BaseEntity {
    account: object;
    bussSysId: string | null;
    bussSysName: string;
    childEmployee: string | null;
    currentDeptName: string | null;
    currentHomepageUrl: string | null;
    currentOrgId: string | null;
    currentOrgName: string | null;
    currentRole: string | null;
    currentStation: string | null;
    employee: string | null;
    nowSkin: object;
    pwdhint: string | null;
    roles: object[];
    skin: object[];
    station: string | null;
    token: string | null;
}
/**
 * 业务类型树信息
 * @param id 业务主键 用于唯一性
 * @param pId 上级id
 * @param title 显示名称
 * @param value 值 可以与id相同
 * @param isLeaf 是否叶子节点
 * @param refObj 原对象值
 * @param version 版本号
 */
export interface TreeEntity {
    id: string;
    pId: string;
    title: string;
    value: string;
    isLeaf?: boolean;
    refObj?: any;
    version?: string;
    mark?: string;
}
/**
 * 换肤
 * @param accountId 当前用户id
 * @param skinId 选择颜色id
 */
export interface ThemeEntity extends VersionEntity {
    accountId: string;
    skinId: string;
}
/**
 * 修改密码
 * @param originalPassword 原密码
 * @param newPassword 新密码
 * @param newPwS 确认新密码
 */
export interface EditPasswordEntity {
    originalPassword: string;
    newPassword: string;
    newPwS: string;
}
/**
 * 获取系统相关信息接口返回字段定义
 * @param applicationName 系统名称
 * @param applicationVersion 系统版本
 * @param basePath 项目域名
 * @param curSystemName
 * @param logo Logo图片地址路径
 * @param organ_async
 * @param projectPhyPath
 * @param skinName 当前肤色id
 * @param sysConfig 系统基本信息
 * @param timestamp
 * @param menuPlace 菜单位置
 */
export declare type VariableEntity = {
    applicationName?: string | null;
    applicationVersion?: string | null;
    basePath?: string | null;
    curSystemName?: string | null;
    logo?: string | null;
    organ_async?: boolean | null;
    projectPhyPath?: any;
    skinName?: string | null;
    sysConfig?: object | null;
    timestamp?: string | null;
    menuPlace: string;
};
export interface newWindow extends Window {
    JReap: any;
    JreapService: any;
    CreateDataBank: any;
    menuclick: any;
    doCreateNewTab: any;
}
/**
 * 通用请求版本号
 * @param version 版本号
 */
export declare type VersionEntity = {
    version?: string;
    [propName: string]: any;
};
/**
 * 组织机构树请求参数
 * @param id 当前组织id
 * @param isUnit 当前组织层
 */
export interface OrgTreeEntity extends VersionEntity {
    id?: '';
    isUnit: string;
}
/**
 * 字典请求参数
 * @param mark 字典编码
 */
export interface DictEntity extends VersionEntity {
    mark: string;
}
/**
* 请求参数
* @param url 请求源
* @param params 参数集
* @param method 请求方式
* @param headers 头部参数
* @param paramType 参数格式
* @param timeout 延时时间
* @param loginPageUrl 登录页面地址
* @param catchErrorFn 错误处理函数
*/
export interface ParamsEntity {
    url: string;
    params?: object;
    method?: string;
    headers?: object;
    paramType?: string;
    timeout?: number;
    loginPageUrl?: string;
    catchErrorFn?(error: any): any;
}
export declare type ActionType = {
    model?: string;
    [propName: string]: any;
};
