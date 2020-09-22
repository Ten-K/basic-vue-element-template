<!-- ctrl + shift + v 预览md文件 -->
# hello-world  
**提示：** 需要先执行Preface的步骤才能登陆，因为登陆具有模拟接口的功能

## Function
1. 封装了常用的el-table,el-form,el-dialog,el-pagination等组件，用于减少代码量，提高开发效率。  
2. 封装axios并挂载到vue实例上全局使用,具有请求拦截和响应拦截功能。
3. 在vue.config.js文件配置了反向代理用于解决跨域问题。
4. 已有指令：
    1. v-enterJump:  用于回车跳转到下一个输入框  
    2. v-focus:  用于进入页面聚焦到某一个输入框

## Preface
server文件：本地服务器。用于模拟接口。  
使用:在server文件下
```
npm install
```
```
node app
```

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
