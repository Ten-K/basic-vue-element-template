import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'
import store from '@/store'
import App from './App.vue'
import router from './router'
import _ from '@/utils'
import '@/utils/directive'
import api from '@/api'

Vue.use(ElementUI);

Vue.prototype.$_ = _
Vue.prototype.$api = api
Vue.config.productionTip = false

const whiteList = ['/','/login']
router.beforeEach(async(to, from, next) => {
  if(whiteList.includes(to.path)){
    next()
  }else{
    if(!to.matched.length && !store.state.modulePermission.hasPermission){//没有权限
      let newRoute = await store.dispatch('getNewRoute')
      //动态添加路由
      router.addRoutes(newRoute)
      next({ ...to, replace: true })
    }else{
      if (to.matched.length === 0) {//页面刷新,路由丢失,重新添加路由
          let newRoutes = await store.dispatch('getNewRoute')
          router.addRoutes(newRoutes)
          next({ ...to, replace: true })
      }else{
        next()
      } 
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')