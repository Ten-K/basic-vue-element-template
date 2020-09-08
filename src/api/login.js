import request from '@/utils/request'

let userApi = {
  Login:'login',
  // get my info
  UserInfo: 'user/info',
}

export function login(data){
  return request({
    url: userApi.Login,
    method: 'post',
    data
  })
}

export function getUserinfo(data){
  return request({
    url: userApi.UserInfo,
    method: 'get',
    params:data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}