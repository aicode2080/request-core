/**
 * rootpath 类装饰器
 * @description 用来获取根地址
 * @author tj
 */
export function rootPath<T extends {new(...args:any[]):{}}>(constructor:T){
    const url = window.parent.location.origin
    return class extends constructor {
        rootPath = url + "/jreap";
    }
}

/**
 * urlSet 方法装饰器
 * @param url 接口地址
 * @deprecated 修改地址
 * @author tj
 */
export function urlSet(url:string){
    return function (target: any, propertyKey: string, descriptor:PropertyDescriptor) {
        //target[parameter] = finalUrl;
        const oMethod = descriptor.value
        //console.log(target, propertyKey)
        //console.log(descriptor)
        // 重新给参数赋值的
        descriptor.value = (...args:any[]) => {

            let arr: any[] = []
            for(let i = 1; i < args.length; i++){
                arr.push(args[i])
            }

            return oMethod.apply(this,[args[0] + url,arr])
        }
    };
}