import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const Login = () => import('@/pages/login')
const Home = () => import('@/pages/home')
const Index = () => import('@/pages/index')
const Table = () => import('@/pages/table')
const Form = () => import('@/pages/form')
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
      { path: "/components/table", component: Table },
      { path: "/components/form", component: Form },
      { path: "/log", component: Log }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router