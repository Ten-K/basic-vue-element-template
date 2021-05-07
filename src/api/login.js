import request from '@/utils/request'

let basicApi = {
  Login:'login',
  // get my info
  UserInfo: 'user/info',
  RoleAuth: 'roleAuth',
  RoleAuthList: 'roleAuthList'
}

let loginApi ={
  login(data){
    return request({
      url: basicApi.Login,
      method: 'post',
      data,
      loading: true
    })
  },
  
  getUserinfo(data){
    return request({
      url: basicApi.UserInfo,
      method: 'get',
      params:data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  roleAuth(data){
    return request({
      url: basicApi.RoleAuth,
      method: 'post',
      data
    })
  },

  getRoleAuthList(data){
    return request({
      url: basicApi.RoleAuthList,
      method: 'post',
      data
    })
  },
}

export default loginApi