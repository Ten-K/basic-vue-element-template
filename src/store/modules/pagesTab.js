export default {
  state: () => ({
    pageTabsList: [ {title: "首页", path: "/home"}],
  }),
  mutations: {
    removeTag (state, name) {
      state.pageTabsList.forEach((item, index) => {
        if (item.path === name) {
          state.pageTabsList.splice(index, 1)
        }
      })
    },
    addTag (state, obj) {
      state.pageTabsList.push(obj)
    },
    clearTag (state) {
      state.pageTabsList.length = 1
    }
  }
}