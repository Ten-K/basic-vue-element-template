import axios from 'axios'
// 配置axios的默认URL
axios.defauls.baseURL = 'xxx/'
// 配置允许跨域携带cookie
axios.defaults.withCredentials = true
// 配置超时时间
axios.defaults.timeout = 10000
// 标识这是一个 ajax 请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// 配置请求拦截
axios.interceptors.request.use(config => {
  config.setHeaders([
    //...
    // 在这里设置请求头与携带token信息
  ])
  return config
})

// axios响应拦截器
axios.interceptors.response.use(response => {
  // 在这里你可以判断后台返回数据携带的请求码
  if (response.data.retcode === 200 || response.data.retcode === '200') {
    return response.data.data || response.data
  } else {
    // 非200请求抱错
    throw Error(response.data.msg || '服务异常')
  }
})
export default request
