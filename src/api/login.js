import request from '@/utils/request'

let basicApi = {
  Login:'login',
  // get my info
  UserInfo: 'user/info',
}

let loginApi ={
  login(data){
    return request({
      url: basicApi.Login,
      method: 'post',
      data
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
  }
}

export default loginApi