import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const Login = () => import('@/pages/login')
const Home = () => import('@/pages/home')
const Index = () => import('@/pages/index')
const Test1 = () => import('@/pages/test1')
const Test2 = () => import('@/pages/test2')
const Log = () => import('@/pages/log')

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: "/home",
    component: Home,
    redirect: "/index",
    children: [
      { path: "/index", component: Index },
      { path: "/test1", component: Test1 },
      { path: "/test2", component: Test2 },
      { path: "/log", component: Log }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router