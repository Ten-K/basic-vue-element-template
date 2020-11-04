import axios from 'axios'
import { Loading, Message } from "element-ui";
// 配置axios的默认URL
const service = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
//可根据开发环境去设置基础地址
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/http://localhost:8080/'
} else if (process.env.NODE_ENV === 'test') {
  axios.defaults.baseURL = '/xxx/'
} else {
  axios.defaults.baseURL = '/xxx/'
}
let loading = null
// 配置允许跨域携带cookie
axios.defaults.withCredentials = true
// 配置超时时间
axios.defaults.timeout = 10000
// 配置请求拦截
service.interceptors.request.use(
  config => {
    //loading不传默认为true,传false可关闭laoding
    config.loading === false ? '' : config.loading = true
    if (config.loading) {
      loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
    return config;
  },
  error => {
    Message(error)
    return Promise.error(error);
  })

// axios响应拦截器
service.interceptors.response.use(
  response => {
    //加定时器为了模拟loading效果，请求时间太短loading出不来，实际开发可去掉定时器
    response.config.loading && setTimeout(() => {
      loading.close();
    }, 300);
    // 在这里你可以判断后台返回数据携带的请求码
    if (response.data.code === 0 || response.data.code === '0') {
      return response.data.data || response.data
    } else {
      // 非200请求报错
      throw Error(response.msg || response.data.msg || '服务异常')
    }
  },
  error => {
    // 关闭loading
    loading.close();
    // 对响应错误处理
    return Promise.reject(error)
  }
)
export default service
