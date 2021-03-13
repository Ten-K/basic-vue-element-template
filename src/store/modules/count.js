export default {
  state: {
    count: 0
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
}