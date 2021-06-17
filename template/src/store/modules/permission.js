import api from '@/api'
import { asyncRoute } from '../../router'
import _ from '@/utils'
import baseMenu from '../../assets/js/menu'
// const getAuth = (authList)=>{
//   let auths = []
//   authList.forEach(auth => {
//     auths.push(auth)
//   })
//   return auths
// }
// const getMenu = (baseMenu,auths)=>{
//   let menu = baseMenu.filter(basem =>{
//     if(auths.includes(basem.href)){
//       if(basem.children){
//         basem.children = getMenu(basem.children,auths)
//       }
//       return true
//     }
//   })
//   return menu
// }
const formatList = (asyncRoute,auths)=>{
  auths = ['/index','/home',...auths] //因为router.addRoutes只能添加一级路由,故将子路由嵌套在一级路由进行动态添加
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
    //获取登录用户
    async getNewRoute({commit}){
      let username = _.get('username')
      let { data } = await api.loginApi.roleAuth({ username }) //获取权限列表
      // let auths = getAuth(data)
      let menu = _.getMenu(baseMenu,data)
      commit('setMenuList',menu)
      let newRoute = formatList(asyncRoute,data)
      commit('sethasPermission', true)
      return newRoute
    },
    changePermission({commit}){
      commit('sethasPermission', false)
    }
  }
}