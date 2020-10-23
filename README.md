<!-- ctrl + shift + v 预览md文件  mddir生成目录结构-->
# hello-world  
**提示：** 需要先执行Preface的步骤才能登陆，因为登陆具有模拟接口的功能。

## Directory Structure
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
    |   |-- app.js  //本地服务器
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
            |-- SimulationVuex
            |   |-- index.vue
            |-- Websocket
            |   |-- index.vue
```

## Preface
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

## Function
1. components文件夹组件说明:
    1. CommDialog组件的目的。利用一个组件解决单页面多个弹窗的问题;
    2. CommForm表单组件。自带搜索和重置按钮,只需传入搜索函数即完成搜索和重置按钮的功能;
    3. CommTable附带上方添加从左右两边开始的按钮及下方添加分页组件的功能(可控制序号列,勾选列,合并行以及自定义操作列);
    4. ExportExcel可将json数据导出成excel并合并单元格。
    5. ExportPdf具有html转pdf并下载的功能。支持分页,标注页脚(少量pdf导出可由前端实现,如果量大不建议前端实现导出);
2. 封装axios并挂载到vue实例上全局使用,具有请求拦截和响应拦截功能;
3. 在vue.config.js文件配置了反向代理用于解决跨域问题；
4. 简易的Websocket聊天窗功能
5. 已有指令:
    1. v-enterJump:  用于回车跳转到下一个输入框  (不能跳转时间控件);
    2. v-focus:  用于进入页面聚焦到某一个输入框。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
