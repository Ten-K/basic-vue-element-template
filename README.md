<!-- ctrl + shift + v 预览md文件  mddir生成目录结构-->
# 前言 
**提示：** 因为登陆具有模拟接口的功能,需先启动本地服务器才能登陆。

## 目录
```
|-- basic-vue-element-template
    |-- .gitignore
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json  //依赖
    |-- README.md  //项目介绍
    |-- vue.config.js  //项目配置
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- server  //后台代码
    |   |-- data //nedb数据库
    |   |-- app.js  //本地服务器
    |   |-- mysql.js  //本地服务器+mysql数据库(已废弃)
    |   |-- package.json
    |-- src
        |-- App.vue //根组件
        |-- main.js  //入口js文件
        |-- api  //接口配置文件
        |   |-- index.js  //统一导出接口文件
        |   |-- login.js
        |   |-- table.js
        |   |-- test.js
        |-- assets  //资源目录，这里的资源会被wabpack构建
        |   |-- imgs
        |   |-- js
        |   |   |-- menu.js  //菜单
        |   |-- style
        |       |-- app.scss  //全局样式
        |-- components  //公用组件
        |   |-- CommDialog
        |   |   |-- index.vue
        |   |-- CommForm
        |   |   |-- index.vue
        |   |-- CommTable
        |   |   |-- index.scss
        |   |   |-- index.vue
        |   |-- ExportExcel
        |   |   |-- index.vue
        |   |-- ExportPdf
        |   |   |-- index.vue
        |   |-- Header
        |   |   |-- index.scss
        |   |   |-- index.vue
        |   |-- Sideber
        |       |-- index.vue
        |-- router  //前端路由
        |   |-- index.js
        |-- store  //Vuex
        |   |-- index.js
        |   |-- modules
        |       |-- loading.js //页面loading管理
        |       |-- pagesTab.js //tab栏管理
        |       |-- permission.js //权限管理
        |-- utils  
        |   |-- index.js  //函数工具库
        |   |-- request.js  //http请求
        |   |-- directive  //全局指令
        |       |-- index.js
        |-- views  //页面目录
            |-- index.vue
            |-- Components
            |   |-- Export
            |   |   |-- index.vue
            |   |-- Form
            |   |   |-- index.vue
            |   |-- Table
            |   |   |-- index.scss
            |   |   |-- index.vue
            |   |-- VerificationCode
            |       |-- Identify.vue
            |       |-- index.vue
            |-- Echarts
            |   |-- index.vue
            |-- EnterJump
            |   |-- index.vue
            |-- Home
            |   |-- index.vue
            |-- Login
            |   |-- index.vue
            |-- Permission
            |   |-- index.vue
            |-- SimulationVuex
            |   |-- index.vue
            |-- Websocket
            |   |-- index.vue
```

## 启动本地服务器
server文件：本地服务器。用于模拟接口。
在server文件下  
使用:
```
npm install
```
启动本地服务器
```
node app
```  

## 功能
1. components文件夹组件说明:
    1. CommDialog组件的目的。利用一个组件解决单页面多个弹窗的问题;
    2. CommForm表单组件。自带搜索和重置按钮,只需传入搜索函数即完成搜索和重置按钮的功能;
    3. CommTable附带上方添加从左右两边开始的按钮及下方添加分页组件的功能(可控制序号列,勾选列,合并行以及自定义操作列);
    4. ExportExcel可将json数据导出成excel并合并单元格;
    5. ExportPdf具有html转pdf并下载的功能。支持分页,标注页脚(少量pdf导出可由前端实现,如果量大不建议前端实现导出);
    6. Header公共头部;
    7. Sideber利用递归组件实现多级菜单.
2. 封装axios并挂载到vue实例上全局使用,具有请求拦截,响应拦截和默认loading功能,如需要loading,可在api文件夹下对应的文件里的请求参数加入loading:true;
3. 在vue.config.js文件配置了反向代理用于解决跨域问题;
4. 简易的Websocket聊天窗功能
5. 已有全局指令:
    1. v-enterJump:  用于回车跳转到下一个输入框  (不能跳转时间控件);
    2. v-focus:  用于进入页面聚焦到某一个输入框.
6. 根据权限动态加载路由及菜单
7. 引入嵌入式数据库nedb,table页可增删改查,Permission页可编辑权限（编辑admin权限后重新登录可看见第6条功能效果）
## 相关页面
![](https://img2020.cnblogs.com/blog/1467361/202011/1467361-20201104103956859-1399111189.png)  
![](https://img2020.cnblogs.com/blog/1467361/202011/1467361-20201104104826137-276690659.png)  
![](https://img2020.cnblogs.com/blog/1467361/202104/1467361-20210420163132508-2071634342.png)

## 安装依赖
```
npm install
```

### 启动项目
```
npm run serve
```

### 项目打包
```
npm run build
```

### 检查代码书写格式(eslint 检查)
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Tip
  菜单使用递归组件故无法使用$emit传值给父组件(本项目使用eventBus实现传值)