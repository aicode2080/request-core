import { LoginEntity, TreeEntity, VariableEntity, BaseEntity, ParamsEntity } from '../types';
/**
 * 公共API
 */
export default class JreapBaseConfigApi {
    /**
     * 异步请求数据接口
     * @param url 接口地址
     * @param params 参数集
     * @param type 请求类型
     * @param headers 请求的头部信息
     */
    getDataService(url: string, params: object, type?: string, headers?: object, paramType?: string): Promise<any>;
    /**
     * 异步请求数据接口-升级版
     * 扩展提供超时及错误信息处理函数
     */
    requestService(param: ParamsEntity): Promise<any>;
    /**
     * 系统信息
     * @param service 接口所属系统
     * @description 获取系统相关信息
     */
    getNavigation(service: string, params?: any, headers?: any): Promise<VariableEntity>;
    /**
     * 登录信息
     * @param service 服务
     */
    getLoginInfo(service: string, params?: any, headers?: any): Promise<LoginEntity>;
    /**
     * 修改密码
     * @param service 服务
     */
    postEditPassword(service: string, params: any, headers?: any): Promise<BaseEntity>;
    /**
     * 换肤
     * @param accountId 当前用户id
     * @param skinId 选择肤色id
     * @param service 服务
     */
    postThemeInfo(service: string, params?: any, headers?: any): Promise<BaseEntity>;
    /**
     * 获得业务类型树信息
     * @param service 服务
     * @param code  业务类型码
     */
    getDictData(service: string, params: any): Promise<TreeEntity[]>;
    /**
     * 获得业务类型树信息
     * @param service 服务
     * @param code  业务类型码
     */
    getDictTreeData(service: string, params: any): Promise<TreeEntity[]>;
    /**
     * 获取机构树信息
     * @param id 当前流程id
     * @param isUnit
     */
    getOrgTree(service: string, params: any, headers?: any): Promise<TreeEntity[]>;
}
