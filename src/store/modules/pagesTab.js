export default {
  state: () => ({
    pageTabsList: [ {title: "首页", path: "/home"}],
  }),
  mutations: {
    // 初始化tab
    initPageTabs (state) {
      if (sessionStorage.pageTabsList) {
        state.pageTabsList = JSON.parse(sessionStorage.pageTabsList)
      }
    },
    removeTag (state, name) {
      state.pageTabsList.forEach((item, index) => {
        if (item.path === name) {
          state.pageTabsList.splice(index, 1)
        }
      })
      sessionStorage.pageTabsList = JSON.stringify(state.pageTabsList)
    },
    addTag (state, obj) {
      state.pageTabsList.push(obj)
      sessionStorage.pageTabsList = JSON.stringify(state.pageTabsList)
    },
    clearTag (state) {
      state.pageTabsList.length = 1
      sessionStorage.pageTabsList = JSON.stringify(state.pageTabsList)
    }
  },
  actions: {
  }
}