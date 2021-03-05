import Vue from 'vue';
import VueRouter from 'vue-router';

// 避免路由重复而报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Login = () => import('@/views/Login')
const Index = () => import('@/views/index')
const Home = () => import('@/views/Home')
const Table = () => import('@/views/Components/Table')
const Form = () => import('@/views/Components/Form')
const EnterJump = () => import('@/views/EnterJump')
const VerificationCode = () => import('@/views/Components/VerificationCode')
const SimulationVuex = () => import('@/views/simulationVuex')
const Ws = () => import('@/views/Websocket')
const Export = () => import('@/views/Components/Export')
const Echarts = () => import('@/views/Echarts')

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: "/index",
    component: Index,
    redirect: "/home",
    children: [
      { path: "/home", name:'home', component: Home, meta:[] },
      { path: "/components/table", name:'eltable', component: Table, meta:['components/Table'] },
      { path: "/components/form", name:'elform', component: Form, meta:['components/Form'] },
      { path: "/components/export", name:'export', component: Export, meta:['components/Export'] },
      { path: "/components/verificationCode", name:'verificationCode', component: VerificationCode, meta:['components/verificationCode'] },
      { path: "/enterjump", name:'enterjump', component: EnterJump, meta:['enterJump'] },
      { path: "/simulationVuex", name:'simulationVuex', component: SimulationVuex, meta:['simulationVuex'] },
      { path: "/ws", name:'ws', component: Ws, meta:['webSocket'] },
      { path: "/echarts", name:'echarts', component: Echarts, meta:['echarts'] },
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router