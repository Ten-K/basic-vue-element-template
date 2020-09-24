<!-- ctrl + shift + v 预览md文件  mddir生成目录结构-->
# hello-world  
**提示：** 需要先执行Preface的步骤才能登陆，因为登陆具有模拟接口的功能

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
    |   |-- ws.js  //WebSocket服务
    |-- src
        |-- App.vue //根组件
        |-- main.js  //入口js文件
        |-- api  //接口配置文件
        |   |-- index.js
        |   |-- login.js
        |   |-- table.js
        |   |-- test.js
        |-- assets  //资源目录，这里的资源会被wabpack构建
        |   |-- imgs
        |   |-- js
        |   |   |-- menu.js
        |   |-- style
        |       |-- app.scss
        |-- components  //公用组件
        |   |-- CommDialog
        |   |   |-- index.vue
        |   |-- CommForm
        |   |   |-- index.vue
        |   |-- CommTable
        |   |   |-- index.scss
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
        |-- utils  //函数工具库
        |   |-- index.js
        |   |-- request.js
        |   |-- directive  //全局指令
        |       |-- index.js
        |-- views  //页面目录
            |-- index.vue
            |-- EnterJump
            |   |-- index.vue
            |-- Export
            |   |-- index.vue
            |-- Form
            |   |-- index.vue
            |-- Home
            |   |-- index.vue
            |-- Login
            |   |-- index.vue
            |-- simulationVuex
            |   |-- index.vue
            |-- Table
            |   |-- index.scss
            |   |-- index.vue
            |-- VerificationCode
            |   |-- Identify.vue
            |   |-- index.vue
            |-- Websocket
                |-- index.vue
```

## Preface
server文件：本地服务器。用于模拟接口。  
在server文件下  
使用:
```
npm install
```
启动本地接口服务器
```
node app
```  
启动WebSocket服务
```
node ws
```
## Function
1. 封装了常用的el-table,el-form,el-dialog,el-pagination等组件，用于减少代码量，提高开发效率。 
2. components文件夹下的ExportPdf文件具有html转pdf并下载的功能，支持分页。 
3. 封装axios并挂载到vue实例上全局使用,具有请求拦截和响应拦截功能。
4. 在vue.config.js文件配置了反向代理用于解决跨域问题。
5. 已有指令：
    1. v-enterJump:  用于回车跳转到下一个输入框  
    2. v-focus:  用于进入页面聚焦到某一个输入框

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
