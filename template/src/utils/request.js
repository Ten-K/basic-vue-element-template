import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const service = axios.create({
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	retry: 4, //重新发起请求次数
	retryDelay: 1000,  //再次发起请求间隔
  timeout: 10000 //超时时间
})

//可根据开发环境去设置基础地址
if (process.env.NODE_ENV === 'development') {
  service.defaults.baseURL = '/'
} else if (process.env.NODE_ENV === 'test') {
  service.defaults.baseURL = '/xxx/'
} else {
  service.defaults.baseURL = 'http://47.103.32.42:8081/'
}

// 配置请求拦截
service.interceptors.request.use(
	(config) => {
		config.loading && store.dispatch('setLoading', true)
		return config
	},
	(error) => {
		Message(error)
		return Promise.error(error)
	}
)

// axios响应拦截器
service.interceptors.response.use(
	(response) => {
		response.config.loading && store.dispatch('setLoading', false)

		// 在这里你可以判断后台返回数据携带的请求码
		if (response.data.code === 0 || response.data.code === '0') {
			return response.data.data || response.data
		} else {
			// 非200请求报错
			throw Error(response.msg || response.data.msg || '服务异常')
		}
	},
	(error) => {
		error.config.loading && store.dispatch('setLoading', false)
		let config = error.config

    //如果config不存在或retry没设置，返回错误
		if (!config || !config.retry) return Promise.reject(error)

		// 记录请求次数
		config.__retryCount = config.__retryCount || 0

		// 大于设置请求次数，返回错误
		if (config.__retryCount >= config.retry) {
			return Promise.reject(error)
		}

		// 请求次数加1
		config.__retryCount += 1

		// 创建延时发起请求函数
		var backoff = new Promise(function(resolve) {
			setTimeout(function() {
				resolve()
			}, config.retryDelay || 1)
		})

		// 延时后再次发起请求
		return backoff.then(function() {
			return service(config)
		})
	}
)
export default service
