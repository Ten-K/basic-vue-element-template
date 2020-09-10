import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import 'default-passive-events'
import _ from '@/utils'
import '@/utils/directive'

Vue.use(ElementUI);

Vue.prototype.$_ = _
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
