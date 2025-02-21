import { urlSet } from '../decorator';
import { LoginEntity, TreeEntity, VariableEntity, BaseEntity, ParamsEntity } from '../types'
import JreapService from './service';
const qs = require('qs');


const formType = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
}

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
    public async getDataService(url: string, params: object, type?: string, headers?: object, paramType?: string): Promise<any> {

        let newParams: any

        if(paramType == 'parse'){
            newParams = qs.parse(params)
        }else{
            newParams = qs.stringify(params)
        }

        if (type == 'GET') {
            return new Promise((resolve,reject) => {
                JreapService.get(`${url}?`+ qs.stringify(params)).then((res: any) => {
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        }

        return new Promise((resolve,reject) => {
            JreapService.post(url, newParams, headers ? { headers } : {}).then((res: any) => {
                resolve(res)
            }).catch((error: any) => {
                reject(error)
            })
        })

    }

    /**
     * 异步请求数据接口-升级版
     * 扩展提供超时及错误信息处理函数
     */
    public async requestService(param: ParamsEntity): Promise<any> {
        const {url, params, method, headers, paramType, timeout, catchErrorFn, loginPageUrl } = param
        let newParams:any

        // 业务自行处理错误返回的函数
        JreapService.defaults.catchErrorFn = catchErrorFn

        // 业务自定义的登录页面地址
        JreapService.defaults.loginPageUrl = loginPageUrl

        if ( method && method == 'GET') {
            newParams = qs.stringify(params)
            return new Promise((resolve,reject) => {
                JreapService.get(`${url}?`+ newParams, {timeout}).then((res: any) => {
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        }else{
            if(paramType && paramType !== ''){
                newParams = qs[paramType](params)
            }else{
                newParams = qs.parse(params)
            }

            return new Promise((resolve,reject) => {
                JreapService.post(url, newParams, {headers, timeout}).then((res: any) => {
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })

        }
    }


    /**
     * 系统信息
     * @param service 接口所属系统
     * @description 获取系统相关信息
     */
    @urlSet("web/pubvariable/getVariable.form")
    public async getNavigation(service: string, params?: any, headers?: any): Promise<VariableEntity> {
        return new Promise((resolve) => {
            JreapService.post(
                service,
                qs.stringify(params[0]),
                headers ? { headers } : {}
            ).then((res: any) => {
                resolve(res)
            })
        })
    }

    /**
     * 登录信息
     * @param service 服务
     */
    @urlSet("web/right/auth/loginInfo.form")
    public async getLoginInfo(service: string, params?: any, headers?: any): Promise<LoginEntity> {
        return new Promise((resolve) => {
            JreapService.post(
                service,
                qs.stringify(params[0]),
                headers ? { headers } : {}
            ).then((res: any) => {
                resolve(res.data.result)
            })
        })
    }

    /**
     * 修改密码
     * @param service 服务
     */
    @urlSet("web/right/accountManager/changePassword.form")
    public async postEditPassword(service: string, params: any, headers?: any): Promise<BaseEntity> {
        return new Promise((resolve) => {
            JreapService.post(
                service,
                qs.stringify(params[0]),
                headers ? { headers } : formType
            ).then((res: any) => {
                resolve(res)
            })
        })
    }

    /**
     * 换肤
     * @param accountId 当前用户id
     * @param skinId 选择肤色id
     * @param service 服务
     */
    @urlSet("web/right/auth/saveSkin.form")
    public async postThemeInfo(service: string, params?: any, headers?: any): Promise<BaseEntity> {
        return new Promise((resolve) => {
            JreapService.post(
                service,
                qs.stringify(params[0]),
                headers ? { headers } : formType
            ).then((res: any) => {
                resolve(res)
            })
        })
    }

    /**
     * 获得业务类型树信息
     * @param service 服务
     * @param code  业务类型码
     */
    @urlSet("web/code/query.form")
    public async getDictData(service: string, params: any): Promise<TreeEntity[]> {
        let trees: TreeEntity[] = []
        let markData: any = sessionStorage.getItem(params[0].mark);
        markData = JSON.parse(markData)
        return new Promise((resolve) => {
            if (markData && Array.isArray(markData)) {
                resolve(markData);
            } else {
                JreapService.get(
                    service + '?' + qs.stringify(params[0])
                ).then((res: any) => {
                    if(res && res.data && res.data.length > 0){
                        res.data.forEach((item: any) => {
                            trees.push({
                                id: item.id,
                                pId: item.parentId,
                                title: item.name,
                                value: item.value,
                                mark:item.mark,
                                refObj: item
                            })
                        })
                        sessionStorage.setItem(params[0].mark, JSON.stringify(trees));
                    }
                    resolve(trees);
                })
            }
        })
    }

    /**
     * 获得业务类型树信息
     * @param service 服务
     * @param code  业务类型码
     */
    @urlSet("web/code/query.form")
    public async getDictTreeData(service: string, params: any): Promise<TreeEntity[]> {
        let trees: TreeEntity[] = []
        let markData: any = sessionStorage.getItem(params[0].mark);
        markData = JSON.parse(markData)
        return new Promise((resolve) => {
            if (markData && Array.isArray(markData)) {
                resolve(markData);
            } else {
            JreapService.get(
                service + '?'+ qs.stringify(params[0])
                ).then((res: any) => {
                    if(res && res.data && res.data.length > 0){
                        res.data.forEach((item: any) => {
                            trees.push({
                                id: item.id,
                                pId: item.parentId,
                                title: item.name,
                                value: item.value,
                                mark:item.mark,
                                refObj: item
                            })
                        })
                        sessionStorage.setItem(params[0].mark, JSON.stringify(trees));
                    }
                    resolve(trees);
            })}
        })
    }


    /**
     * 获取机构树信息
     * @param id 当前流程id
     * @param isUnit  
     */
    @urlSet("web/right/util/findOrgTree.form")
    public async getOrgTree(service: string, params: any, headers?: any): Promise<TreeEntity[]> {
        let trees: TreeEntity[] = []
        
        return new Promise((resolve) => {
            JreapService.post(
                service,
                qs.stringify(params[0]),
                headers ? { headers } : formType
            ).then((res: any) => {
                if(res && res.data){
                    res.data.rows.forEach((item: any) => {
                        trees.push({
                            id: item.id,
                            pId: params[0].id,
                            title: item.name,
                            value: item.target.code,
                            isLeaf: !item.hasChild,
                            refObj: item
                        })
                    })
                    resolve(trees);
                }else{
                    resolve(res);
                }
            })
        })
    }
}
