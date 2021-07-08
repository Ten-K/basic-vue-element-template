// vue.config.js 
module.exports = {
  lintOnSave: false, //关闭esline
  //将打包文件为相对路径(避免上线后路径错误)
  publicPath: './',
  devServer: {
    proxy: {
      '/': {                //这里最好有一个 /
        // target: 'http://47.103.32.42:8081/',         // 服务器端接口地址
        target: 'http://localhost:3000/',         // 服务器端接口地址
        ws: true,            //如果要代理 websockets，配置这个参数
        // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}