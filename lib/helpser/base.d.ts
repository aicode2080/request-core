import { Joiner, Error } from '../types';
/**
 * 替换连接符
 * @param name
 * @param oldJoiner
 * @param newJoiner
 * @description 中划线和下划线连接符互换
 */
export declare function getSimpleName(name: string, oldJoiner: Joiner, newJoiner: Joiner): Error | string;
/**
 * 获取session值
 * @param key
 * @description 获取session值
 */
export declare function getSessionAttr(key: string): object | null;
/**
 * 设置session值
 * @param key
 * @description 设置session值
 */
export declare function setSessionAttr(key: string, val: any): void;
/**
 * 获取真实路径
 * @param url
 * @description 通过请求地址获取当前窗口真实的url地址
 */
export declare function getRealPath(url: string): string;
/**
 * 获取当前窗口name参数的值
 * @param name
 * @description 通过获取当前窗口的url获取url后的参数
 */
export declare function getQueryVal(name: string): string | null;
/**
 * 添加cookie
 * @param name cookie名称
 * @param value cookie值
 * @param expiresHours 多少小时后过期,为0时不设定过期时间，即当浏览器关闭时cookie自动消失
 * @description 在浏览器中添加cookie
 */
export declare function addCookie(name: string, value: string, expiresHours?: number): void;
/**
 * 获取cookie
 * @param name cookie名称
 * @description 通过cookie名称获取cookie的值
 */
export declare function getCookie(name: string): string | null;
/**
 * 删除cookie
 * @param name cookie名称
 * @description 通过cookie名称删除cookie
 */
export declare function deleteCookie(name: string): void;
/**
 * 数组非空判断
 * @param arr 数组
 * @description 遍历数组，如果当前数组不为空，则返回true，并停止遍历。
 */
export declare function objcetEmpty(arr: any[]): boolean;
/**
 * 删除数组中的空值
 * @param arr 数组
 * @description 遍历数组，如果当前值为空、null、undefined时，删除此值，并返回新的数组
 */
export declare function deleteEmptyProperty(arr: any[]): any[];
/**
 * 删除数组中指定位置的值
 * @param arr 数组
 * @param index 需要删除的数值的下标，从0开始
 * @description 根据index删除数组元素，并返回新数组
 */
export declare function delArrayByIndex(arr: any[], index: number): any[];
/**
 * 查找当前节点是否有指定class的父元素
 * @param element 当前节点
 * @param parentClassName 父元素的class名称
 * @description 判断元素是否含有指定class的父元素
 */
export declare function hasParent(element: any, parentClassName: string): boolean;
/**
 * 判断当前元素是否包含指定class
 * @param element 当前元素
 * @param className 指定的class名称
 */
export declare function hasClassName(element: HTMLElement, className: string): boolean;
/**
 * 为当前元素增加指定class
 * @param element 当前元素
 * @param className 指定的class名称
 */
export declare function addClassName(element: HTMLElement, className: string): void;
/**
* 删除当前元素中指定class
* @param element 当前元素
* @param className 指定的class名称
*/
export declare function removeClassName(element: HTMLElement, className: string): void;
/**
 * 创建tab选项卡（最外层框架）
 * @param id 对应的id名称
 * @param href 对应的链接地址
 * @param title 标签名称
 * @param urlType url地址的类型 "1"普通资源,"2"外部服务资源,"3"路由资源
 * @description 判断是否有标签，如果无则创建一个标签追加到page-tabs-content里，如果标签存在，但无相尖的iframe，则创建一个iframe追回到.content内容展示区
 */
export declare function createTopMenu(id: string, href: string, title: string, urlType?: string): void;
/**
 * 删除tab选项卡（最外层框架）
 * @param id 对应的id名称
 * @param homepage 流程用，是否回到首页
 * @param urlType url地址的类型 "1"普通资源,"2"外部服务资源,"3"路由资源
 */
export declare function deleteTopMenu(id: string, homepage?: boolean, urlType?: string): void;
/**
 * 监听值的改变
 * @param name 名字
 * @param value 监听的值
 * @description 能过判断name来需要监听相对应的值的变化
 */
export declare function monitorValue(name: string, value: any): void;
/**
 * 64位方法加密
 * @description 传入需要加密/解密的字符串进行加密/解密处理
 */
export declare function Base64(): any;
/**
* 时间格式处理
* @param fmt 格式
* @description 传入想要的时间格式
*/
export declare function format(date: Date, fmt: string): string;
/**
* 换肤-body
* @description 在session中获取皮肤色，在当前的body上添加当前肤色样式
*/
export declare function changeBodyTheme(): void;
/**
* 换肤
* @description 在当前的body和页面中所有的iframe的body上添加当前肤色样式
*/
export declare function changeTheme(): void;
/**
 * 页面超时判断函数
 * @description 老的kendo调用如果页面超时会调用此方法，用于react框架中的页面监听
 */
export declare function resload(): void;
/**
 * 对字段进行md5加密
 * @description 将参数进行md5加密后，获取header的数据
 * @param data  传递给后台的参数
 * @param key   加密秘钥（可以和后台约定）
 */
export declare const getEncryptedHeaderMd5: (data: any, key?: string) => {
    timestamp: number;
    nonce: string;
    signature: any;
};
/**
 * RSA加密处理
 * @description 对参数进行RSA加密
 * @param publicKey  公共秘钥
 * @param data  encodeURIComponent转码后的参数，例encodeURIComponent(values.pwd)
 */
export declare const getKey4RSA: (publicKey: any, data: string) => any;
