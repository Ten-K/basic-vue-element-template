import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate"
import modulePagesTab from '@/store/modules/pagesTab'
import moduleLoading from '@/store/modules/loading'
import modulePermission from '@/store/modules/permission'

export default new Vuex.Store({
  state: {
    count: 0,
    settings:{
      theme: ''
    }
  },
  getters: {
    getCount(state) {
      return state.count
    }
  },
  mutations: {
    addCount(state, num) {
      state.count += num
    },
    delCount(state, num) {
      state.count > 0 ? state.count -= num : state.count = 0
    }
  },
  actions: {
    getAddCount(context, num) {
      context.commit('addCount', num)
    },
    getDelCount(context, num) {
      context.commit('delCount', num)
    }
  },
  modules:{
    modulePagesTab,
    moduleLoading,
    modulePermission
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})