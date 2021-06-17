import request from '@/utils/request'

let basicApi = {
  updateRoleAuth:'update/roleAuth',
}

let authApi = {
  updateRoleAuth(data){
    return request({
      url: basicApi.updateRoleAuth,
      method: 'post',
      data,
    })
  }
}

export default authApi