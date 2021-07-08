import axios from 'axios'
import store from '@/store'
import { Message } from "element-ui";
const service = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
// 配置允许跨域携带cookie
axios.defaults.withCredentials = true
// 配置超时时间
axios.defaults.timeout = 10000
// 配置请求拦截
service.interceptors.request.use(
  config => {
    config.loading && store.dispatch('setLoading', true)
    return config;
  },
  error => {
    Message(error)
    return Promise.error(error);
  })

// axios响应拦截器
service.interceptors.response.use(
  response => {
    response.config.loading && store.dispatch('setLoading', false)
    // 在这里你可以判断后台返回数据携带的请求码
    if (response.data.code === 0 || response.data.code === '0') {
      return response.data.data || response.data
    } else {
      // 非200请求报错
      throw Error(response.msg || response.data.msg || '服务异常')
    }
  },
  error => {
    error.config.loading && store.dispatch('setLoading', false)
    // 对响应错误处理
    return Promise.reject(error)
  }
)
export default service
