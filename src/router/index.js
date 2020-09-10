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
const Table = () => import('@/views/Table')
const Form = () => import('@/views/Form')
const EnterJump = () => import('@/views/EnterJump')
const Test = () => import('@/views/Test')

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: "/index",
    component: Index,
    redirect: "/home",
    children: [
      { path: "/home", name:'home', component: Home },
      { path: "/components/table", name:'table', component: Table },
      { path: "/components/form", name:'form', component: Form },
      { path: "/enterjump", name:'log', component: EnterJump },
      { path: "/test", name:'test', component: Test }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router