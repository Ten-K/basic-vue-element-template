import request from '@/utils/request'

let basicApi = {
  product:'list/product',
}

let testApi = {
  product(data){
    return request({
      url: basicApi.product,
      method: 'get',
      params:data,
    })
  }
}

export default testApi