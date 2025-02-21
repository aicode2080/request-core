import JreapCoreConfigApi from '../api/index'
import { Jreap, LoginEntity, TreeEntity,ParamsEntity, ThemeEntity, BaseEntity, EditPasswordEntity, VariableEntity, OrgTreeEntity, DictEntity, VersionEntity } from '../types'

/**
 * 接口请求共用函数 - 将废弃
 * @param params
 */
export async function getDataService(url: string, params: object, type?: string, headers?: object, paramType?: string):Promise<BaseEntity | object>{
    let data: BaseEntity = await new JreapCoreConfigApi().getDataService(url, params, type, headers, paramType)

    return new Promise((resolve) => {
        resolve(data)
    })
}

/**
 * 接口请求共用函数
 * @param params
 */
export async function requestService(param: ParamsEntity):Promise<BaseEntity | object>{
    let data: BaseEntity = await new JreapCoreConfigApi().requestService(param)

    return new Promise((resolve) => {
        resolve(data)
    })
}

/**
 * 获得登录信息
 * @param service 服务
 */
export async function getLoginInfo(service: string, params?: VersionEntity, headers?: any):Promise<LoginEntity | object>{
    let data: LoginEntity | object = {}
    if(this.getSessionAttr('loginInfo')){
        data = this.getSessionAttr('loginInfo')!
    } else {
        data = await new JreapCoreConfigApi().getLoginInfo(service, params, headers)
        this.setSessionAttr("loginInfo",data)
    }
    return new Promise((resolve) => {
        resolve(data)
    })
}

/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
export async function getDictData(service: string, params: DictEntity):Promise<TreeEntity[] | object>{
    let data: TreeEntity[] | object = {}
    data = await new JreapCoreConfigApi().getDictData(service, params)
    return new Promise((resolve) => {
        resolve(data)
    })
}

/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
export async function getDictTreeData(service: string, params: DictEntity):Promise<TreeEntity[] | object>{
    let data: TreeEntity[] | object = {}
    data = await new JreapCoreConfigApi().getDictTreeData(service, params)
    return new Promise((resolve) => {
        resolve(data)
    })
}


/**
 * 获取机构树信息
 * @param parentId 当前流程id
 * @param isUnit  
 */
export async function getOrgTree(service: string, params: OrgTreeEntity, headers?: any):Promise<TreeEntity[] | object>{
    let data: TreeEntity[] | object = {}
    data = await new JreapCoreConfigApi().getOrgTree(service, params, headers)

    return new Promise((resolve) => {
        resolve(data)
    })
}

/**
 * 换肤请求
 * @param accountId 当前用户id
 * @param skinId 选择肤色id
 */
export async function postThemeInfo(service: string, params: ThemeEntity, headers?: any):Promise<BaseEntity | object>{
    let data: BaseEntity = await new JreapCoreConfigApi().postThemeInfo(service, params, headers)

    return new Promise((resolve) => {
        resolve(data)
    })
}

/**
 * 修改密码
 * @param accountId 当前用户id
 * @param skinId 选择肤色id
 */
export async function postEditPassword(service: string, params: EditPasswordEntity, headers?: any):Promise<BaseEntity | object>{
    let data: BaseEntity = await new JreapCoreConfigApi().postEditPassword(service, params, headers)

    return new Promise((resolve) => {
        resolve(data)
    })
}

/**
 * 获得业务类型树信息
 * @param service 服务
 * @param code  业务类型码
 */
export async function getNavigation(service: string, params?: VersionEntity, headers?: any):Promise<VariableEntity | object>{
    let data: VariableEntity | object = {}
    data = await new JreapCoreConfigApi().getNavigation(service, params, headers)
    return new Promise((resolve) => {
        resolve(data)
    })
}