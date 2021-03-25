export default {
  state: () => ({ 
    requestLoading: 0
  }),
  mutations: {
    set_loading (state, boolean) {
      boolean ? ++state.requestLoading : --state.requestLoading
    }
  },
  actions: {
    setLoading ({ commit }, boolean) {
      commit('set_loading', boolean)
    }
  }
}