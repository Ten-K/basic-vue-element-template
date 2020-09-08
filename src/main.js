import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import 'default-passive-events'

Vue.use(ElementUI);

Vue.config.productionTip = false


// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……聚焦
  inserted: function (el) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
