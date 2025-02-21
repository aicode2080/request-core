/**
 * rootpath 类装饰器
 * @description 用来获取根地址
 * @author tj
 */
export declare function rootPath<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {
        rootPath: string;
    };
} & T;
/**
 * urlSet 方法装饰器
 * @param url 接口地址
 * @deprecated 修改地址
 * @author tj
 */
export declare function urlSet(url: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
