import Vue from 'vue';
import VueRouter from 'vue-router';

// 避免路由重复而报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Login = () => import('@/pages/login')
const Home = () => import('@/pages/home')
const Index = () => import('@/pages/index')
const Table = () => import('@/pages/table')
const Form = () => import('@/pages/form')
const Log = () => import('@/pages/log')
const Test = () => import('@/pages/test')

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: "/home",
    component: Home,
    redirect: "/index",
    children: [
      { path: "/index", name:'index', component: Index },
      { path: "/components/table", name:'table', component: Table },
      { path: "/components/form", name:'form', component: Form },
      { path: "/log", name:'log', component: Log },
      { path: "/test", name:'test', component: Test }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router