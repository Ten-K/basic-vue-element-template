import axios from 'axios'
import { Loading, Message } from "element-ui";
// 配置axios的默认URL
const service = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
let loading = null
// 配置允许跨域携带cookie
axios.defaults.withCredentials = true
// 配置超时时间
axios.defaults.timeout = 10000
// 配置请求拦截
service.interceptors.request.use(
  config => {
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;
  },
  error => {
    Message(error)
    return Promise.error(error);
  })

// axios响应拦截器
service.interceptors.response.use(
  response => {
    setTimeout(() => {
      loading.close();
    }, 300);
    // 在这里你可以判断后台返回数据携带的请求码
    if (response.data.code === 0 || response.data.code === '0') {
      return response.data.data || response.data
    } else {
      // 非200请求抱错
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
