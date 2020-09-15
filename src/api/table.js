import request from '@/utils/request'

let basicApi = {
  tableList:'table/list',
}
let tableApi ={
  tableList(data){
    return request({
      url: basicApi.tableList,
      method: 'get',
      params:data,
    })
  }
}

export default tableApi
