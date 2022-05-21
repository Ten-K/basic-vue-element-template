// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.mode = 'production'
			config.performance = {
				//打包文件大小配置
				maxEntrypointSize: 10000000,
				maxAssetSize: 30000000
			}
			// 移除console及注释
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						output: {
							comments: false // 去掉注释
						},
						warnings: false,
						compress: {
							drop_console: true,
							drop_debugger: false,
							pure_funcs: ['console.log'] //移除console
						}
					},
					sourceMap: false,
					parallel: true
				})
			)
			//webpack打包分析
			// config.plugins.push(new BundleAnalyzerPlugin())
			// 公共代码抽离
			config.optimization = {
				splitChunks: {
					cacheGroups: {
						vendor: {
							chunks: 'all',
							test: /node_modules/,
							name: 'vendor',
							minChunks: 1,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 100
						},
						common: {
							chunks: 'all',
							test: /[\\/]src[\\/]js[\\/]/,
							name: 'common',
							minChunks: 2,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 60
						},
						styles: {
							name: 'styles',
							test: /\.(sa|sc|c)ss$/,
							chunks: 'all',
							enforce: true
						},
						runtimeChunk: {
							name: 'manifest'
						}
					}
				}
			}
		} else {
			// 为开发环境修改配置...
		}
	},
	chainWebpack(config) {
		// when there are many pages, it will cause too many meaningless requests
		config.plugins.delete('prefetch').delete('preload')
		// https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
		//避免文件的频繁变更导致浏览器缓存失效，所以其是更好的利用缓存。提升用户体验。
		config.optimization.runtimeChunk('single')
	},
	lintOnSave: false, //关闭esline
	publicPath: './', //将打包文件为相对路径(避免上线后路径错误)
	productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
	devServer: {
		proxy: {
			'/': {
				//这里最好有一个 /
				target: 'http://47.103.32.42:8081/', // 线上服务器端接口地址
				// target: 'http://localhost:3000/', // 本地服务器端接口地址
				ws: true, //如果要代理 websockets，配置这个参数
				// 如果是https接口，需要配置这个参数
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/': '/'
				}
			}
		}
	}
}
