import api from '@/api'
import { asyncRoute } from '../../router'
import baseMenu from '../../assets/js/menu'
const getAuth = (menuList)=>{
  let auths = []
  menuList.forEach(m => {
    auths.push(m.auth)
  })
  return auths
}
const getMenu = (baseMenu,auths)=>{
  let menu = baseMenu.filter(basem =>{
    if(auths.includes(basem.href)){
      if(basem.children){
        basem.children = getMenu(basem.children,auths)
      }
      return true
    }
  })
  return menu
}
const formatList = (asyncRoute,auths)=>{
  return asyncRoute.filter(route =>{
    if(auths.includes(route.path)){
      if(route.children){
        route.children = formatList(route.children,auths)
      }
      return true
    }
  })
}
export default {
  state: () => ({ 
    hasPermission: false,
    menuList: []
  }),
  mutations: {
    setMenuList(state,menu){
      state.menuList = menu
    },
    sethasPermission(state,hasPermission){
      state.hasPermission = hasPermission
    }
  },
  actions: {
    async getNewRoute({commit,dispatch}){
      let { data } = await api.loginApi.roleAuth() //获取权限列表
      let auths = getAuth(data)
      let menu = getMenu(baseMenu,auths)
      commit('setMenuList',menu)
      let newRoute = formatList(asyncRoute,auths)
      commit('sethasPermission', true)
      return newRoute
    },
    changePermission({commit}){
      commit('sethasPermission', false)
    }
  }
}