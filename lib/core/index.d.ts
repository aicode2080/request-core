import { Jreap } from '../types';
import * as Base from '../helpser/base';
import * as System from '../helpser/systemInfo';
/**
 * 公共类库
 * @author tj
 * @description 平台公共方法和基本信息
 */
declare class jreap implements Jreap {
    about: string;
    rootPath: string;
    baseProj: string;
    jreapProj: string;
    bpmProj: string;
    wflowMgrProj: string;
    wflowDesignProj: string;
    getCreatTopMenu: object | null;
    topMenu: any;
    isResload: any;
    monitorChangeValue: any;
    constructor();
    getDataService: typeof System.getDataService;
    requestService: typeof System.requestService;
    getNavigation: typeof System.getNavigation;
    getLoginInfo: typeof System.getLoginInfo;
    postEditPassword: typeof System.postEditPassword;
    getDictData: typeof System.getDictData;
    getDictTreeData: typeof System.getDictTreeData;
    getOrgTree: typeof System.getOrgTree;
    postThemeInfo: typeof System.postThemeInfo;
    getSessionAttr: typeof Base.getSessionAttr;
    setSessionAttr: typeof Base.setSessionAttr;
    getSimpleName: typeof Base.getSimpleName;
    getRealPath: typeof Base.getRealPath;
    getQueryVal: typeof Base.getQueryVal;
    addCookie: typeof Base.addCookie;
    getCookie: typeof Base.getCookie;
    deleteCookie: typeof Base.deleteCookie;
    objcetEmpty: typeof Base.objcetEmpty;
    deleteEmptyProperty: typeof Base.deleteEmptyProperty;
    delArrayByIndex: typeof Base.delArrayByIndex;
    hasParent: typeof Base.hasParent;
    hasClassName: typeof Base.hasClassName;
    addClassName: typeof Base.addClassName;
    removeClassName: typeof Base.removeClassName;
    Base64: typeof Base.Base64;
    format: typeof Base.format;
    changeTheme: typeof Base.changeTheme;
    changeBodyTheme: typeof Base.changeBodyTheme;
    createTopMenu: typeof Base.createTopMenu;
    deleteTopMenu: typeof Base.deleteTopMenu;
    monitorValue: typeof Base.monitorValue;
    resload: typeof Base.resload;
    getEncryptedHeaderMd5: (data: any, key?: string) => {
        timestamp: number;
        nonce: string;
        signature: any;
    };
    getKey4RSA: (publicKey: any, data: string) => any;
}
declare const JReap: jreap;
export default JReap;
