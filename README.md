# 欢迎使用jreap-core方法库
此库包含共用方法、jreap平台的共用样式和所有接口的请求和拦截处理。

# 使用方法
## 安装
切换请求源后进行安装
```javascript
	 npm config set registry http://192.168.21.100:8888
	 npm install jreap-core
```

## 引入到项目中
```javascript
	import JReap, { JreapService ,CreateDataBank } from 'jreap-core'
```
- JreapService和CreateDataBank是可选项，如果没有用到可以不引入，减少项目体积

# 共用方法
## 基础信息
```javascript
	JReap.about = "JReap基础js库";
	JReap.rootPath = "";
	JReap.baseProj = '/base/'; 
	JReap.jreapProj = '/jreap/';
	JReap.bpmProj ='/bpm/';
	JReap.wflowMgrProj = '/wflow-manager/';
	JReap.wflowDesignProj = '/wflow-design/';
```
## 列表
关于jreap-core的使用方法，请移步 http://192.168.20.11:8181/page/help/help.html


### 公共接口
- getDictData 字典
- getOrgTree 获得业务类型树信息
- postThemeInfo 换肤请求
- postEditPassword 修改密码
- getDataService 通用请求
- getNavigation 获取系统信息

### 公共方法
- getLoginInfo 获取登录信息
- getSessionAttr 获得session属性
- setSessionAttr 设置session值
- getRealPath 获取真实路径
- getQueryVal 获取当前窗口name参数的值
- getSimpleName 中划线和下划线连接符互换
- addCookie 设置cookie
- getCookie 获取cookie
- deleteCookie 删除cookie
- objcetEmpty 数组非空判断
- deleteEmptyProperty 删除数组里的空值、null、undefined
- delArrayByIndex 删除数组中指定位置的值
- hasParent 查找当前节点是否有指定class的父元素
- hasClassName 判断当前元素是否包含指定c
- addClassName 判断当前元素是否包含指定class
- removeClassName 删除当前元素中指定class
- Base64 64位方法加密
- format 时间格式化
- changeTheme 换肤函数
- createTopMenu 创建tab标签

# 版本信息

## 1.0.7
#### 功能特性

- 登录失效跳出地址调整


## 2.1.16
#### 修改BUG
- doCreateNewTab方法暴露在window （和menuclick方法用法一样）

## 2.1.17
#### 修改BUG
- 字典方法返回空数据时返回空数据修改

## 2.1.18
#### 换肤方法取值修改
- 换肤方法取值修改
- doCreateNewTab方法修改

## 2.1.19
#### 换肤方法取值修改
- 换肤方法取值修改 大字号取值修改

## 2.1.20
#### 换肤大字号取值修改
- 大字号取值判断修改

## 2.1.22
#### 统一拦截处理
- 统一拦截错误提示同时出现不叠加 打dist


## 2.1.24
#### 统一拦截处理
- 统一拦截增加自动跳转地址


## 2.1.25
#### 统一拦截处理
- 统一拦截403不重复


## 2.1.26
#### 字典接口
- 修改mark取item.mark value取item.value


## 2.1.27
#### 修改400报错信息
- 修改400报错信息前端提示
# request-core
