import JReap from "./core";
import JreapService from "./api/service"
import menuclick from "./api/service"
import doCreateNewTab from "./api/service"
import CreateDataBank from './api/dataBank'
import { newWindow } from './types/index'

// import './assets/css/index.scss'

// jreap挂载到window下
declare var global:newWindow

global.JReap = JReap
global.JreapService = JreapService
global.CreateDataBank = CreateDataBank
global.menuclick = (name: string, url: string, id: string, urlType?: string)=> {
    JReap.createTopMenu(id, url, name, urlType);
}
global.doCreateNewTab = (id: string, name: string, url: string, urlType?: string)=> {
    JReap.createTopMenu(id, url, name, urlType);
}

export default JReap
export  { JreapService , CreateDataBank ,menuclick,doCreateNewTab}

//console.log(JReap.getSimpleName('a_b_c','_','-')) //a-b-c

//获取当前服务service的名字
// const wflowDesignProj = JReap.wflowDesignProj

// JReap.pages(wflowDesignProj).then((data: any) => {
//     console.log(data)
// })

// 获取系统信息
// const baseProj = JReap.baseProj
// JReap.getNavigation(baseProj).then((data: any) => {
//     console.log(data)
// })

//获取登录信息
// const baseProj = JReap.baseProj
// JReap.getLoginInfo(baseProj).then((data: any) => {
//     console.log(data)
// })

// 获得业务类型树信息
// const code = 'jreapbiz_SYSTEM_BPM_BSTYPE'
// JReap.getDictData(JReap.baseProj, {
//     mark: code
// }).then((data: any) => {
//     console.log(data)
// })

// 获得业务类型树信息
// JReap.getOrgTree(JReap.jreapProj, {
//     id: '',
//     isUnit: '1'
// }).then((data: any) => {
//     console.log(data)
// })

//获取key名为loginInfo的session信息
// console.log(JReap.getSessionAttr('loginInfo'))

// 设置key名为Session的键值对
// JReap.setSessionAttr('Session', {
//     name: 'zs',
//     age: '18'
// })

// 获取真实路径
// const realUrl = JReap.getRealPath('/a/b/c/d')
// console.log(realUrl)

// 获取当前窗口name参数的值
// const query = JReap.getQueryVal('a')
// console.log(query)

// 设置cookie，无时间时
// JReap.addCookie('testname','value')

// 设置cookie，距当前时间多少小时后过期
// JReap.addCookie('time','100', 1200)

// 获取cookie
// const time = JReap.getCookie('time')
// console.log(time)

// 删除cookie
// JReap.deleteCookie('testname')

// 数组非空判断
// const arr = [1,2,3,4]
// console.log(JReap.objcetEmpty(arr))

// 查找当前节点是否有指定class的父元素
// const title: any = document.getElementById('title')
// title.onclick = function(e: any){
//     console.log(JReap.hasParent(e.target, 'box'))
// }

// 删除数组里的空值、null、undefined
// const arr = JReap.deleteEmptyProperty([1,'',2,' ',null,3,undefined,4,5])
// console.log(arr)

// 删除数组中指定位置的值
// const arr = JReap.delArrayByIndex([1,2,3,4],2)
// console.log(arr)

// 判断当前元素是否包含指定class
// const title: any = document.getElementById('title')
// console.log(JReap.hasClassName(title, 'box'))

//删除当前元素中指定class
// const title: any = document.getElementById('title')
// JReap.removeClassName(title, 'class-name')

// 64位方法加密
// const name = JReap.Base64().encode('abc')
// const testName = JReap.Base64().decode(name)
// console.log(name)
// console.log(testName)

// 时间格式化
// const date = new Date();
// console.log(JReap.format(date, 'yyyy-MM-dd')) // 2019-10-25
// console.log(JReap.format(date, 'yyyy年MM月dd日'))   // 2019年10月25日
// console.log(JReap.format(date, 'yyyy-MM-dd hh:mm:ss'))  // 2019-10-25 17:12:09


// body换肤函数
// JReap.changeBodyTheme()

// 换肤函数
// let iframeList = document.getElementsByTagName('iframe')
// for(let i=0; i < iframeList.length; i++){
//     iframeList[i].onload = function() {
//         JReap.changeTheme()
//     };
// }

//换肤请求
// const jreapProj = JReap.jreapProj
// const loginInfo: any = JReap.getSessionAttr('loginInfo')
// const accountId = loginInfo.data.account.id
// const skinId = loginInfo.data.nowSkin.id

// JReap.postThemeInfo(jreapProj,{accountId,skinId}).then((data: any) => {
//     console.log(data)
// })

// 修改密码
// const jreapProj = JReap.jreapProj
// JReap.postEditPassword(jreapProj,{
//     originalPassword: 'abcd1234@',
//     newPassword: 'abcd1234!',
//     newPwS: 'abcd1234!'
// }).then((data: any) => {
//     console.log(data)
// })

// 通用请求
// const url = JReap.jreapProj + 'web/right/util/findOrgTree.form' 
// const params = {}
// JReap.getDataService(url,params,'POST').then((data: any) => {
//     console.log(data)
// })
