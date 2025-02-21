import { LoginEntity, TreeEntity, ParamsEntity, ThemeEntity, BaseEntity, EditPasswordEntity, VariableEntity, OrgTreeEntity, DictEntity, VersionEntity } from '../types';
/**
 * 接口请求共用函数 - 将废弃
 * @param params
 */
export declare function getDataService(url: string, params: object, type?: string, headers?: object, paramType?: string): Promise<BaseEntity | object>;
/**
 * 接口请求共用函数
 * @param params
 */
export declare function requestService(param: ParamsEntity): Promise<BaseEntity | object>;
/**
 * 获得登录信息
 * @param service 服务
 */
export declare function getLoginInfo(service: string, params?: VersionEntity, headers?: any): Promise<LoginEntity | object>;
/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
export declare function getDictData(service: string, params: DictEntity): Promise<TreeEntity[] | object>;
/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
export declare function getDictTreeData(service: string, params: DictEntity): Promise<TreeEntity[] | object>;
/**
 * 获取机构树信息
 * @param parentId 当前流程id
 * @param isUnit
 */
export declare function getOrgTree(service: string, params: OrgTreeEntity, headers?: any): Promise<TreeEntity[] | object>;
/**
 * 换肤请求
 * @param accountId 当前用户id
 * @param skinId 选择肤色id
 */
export declare function postThemeInfo(service: string, params: ThemeEntity, headers?: any): Promise<BaseEntity | object>;
/**
 * 修改密码
 * @param accountId 当前用户id
 * @param skinId 选择肤色id
 */
export declare function postEditPassword(service: string, params: EditPasswordEntity, headers?: any): Promise<BaseEntity | object>;
/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
export declare function getNavigation(service: string, params?: VersionEntity, headers?: any): Promise<VariableEntity | object>;
