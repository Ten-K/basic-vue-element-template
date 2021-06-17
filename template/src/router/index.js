import Vue from 'vue'
import VueRouter from 'vue-router'

// 避免路由重复而报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const Login = () => import('@/views/Login')
const Index = () => import('@/views/index')
const Home = () => import('@/views/Home')
const baseView = () => import('@/views/Components/baseView')
const Table = () => import('@/views/Components/Table')
const Form = () => import('@/views/Components/Form')
const EnterJump = () => import('@/views/EnterJump')
const VerificationCode = () => import('@/views/Components/VerificationCode')
const SimulationVuex = () => import('@/views/simulationVuex')
const Ws = () => import('@/views/Websocket')
const Export = () => import('@/views/Components/Export')
const Echarts = () => import('@/views/Echarts')
const Permission = () => import('@/views/Permission')

export const asyncRoute = [
  {
		path: '/index',
		component: Index,
		redirect: '/home',
		children: [
			{ path: '/home', name: 'home', component: Home, meta: [] },
      {
        path: '/components',
        component: baseView,
        children: [
          {
            path: '/components/table',
            name: 'eltable',
            component: Table,
            meta: ['components/Table'],
          },
          {
            path: '/components/form',
            name: 'elform',
            component: Form,
            meta: ['components/Form'],
          },
          {
            path: '/components/export',
            name: 'export',
            component: Export,
            meta: ['components/Export'],
          },
          {
            path: '/components/verificationCode',
            name: 'verificationCode',
            component: VerificationCode,
            meta: ['components/verificationCode'],
          },
        ],
      },
      {
        path: '/enterjump',
        name: 'enterjump',
        component: EnterJump,
        meta: ['enterJump'],
      },
      {
        path: '/simulationVuex',
        name: 'simulationVuex',
        component: SimulationVuex,
        meta: ['simulationVuex'],
      },
      { path: '/ws', name: 'ws', component: Ws, meta: ['webSocket'] },
      {
        path: '/echarts',
        name: 'echarts',
        component: Echarts,
        meta: ['echarts'],
      },
      {
        path: '/permission',
        name: 'permission',
        component: Permission,
        meta: ['permission'],
      },
		],
	}
]
const routes = [
	{ path: '/', component: Login },
	{ path: '/login', component: Login },
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})
 

const router = createRouter()
 

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
