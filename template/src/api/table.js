import request from '@/utils/request'

let basicApi = {
  tableList: 'table/list',
  tableAdd: 'table/add',
  tableUpdata: 'table/updata',
  tableDelete: 'table/delete',
  tableDeletes: 'table/deletes',
}
let tableApi ={
  tableList(data){
    return request({
      url: basicApi.tableList,
      method: 'get',
      params: data,
    })
  },
  tableAdd(data){
    return request({
      url: basicApi.tableAdd,
      method: 'post',
      data,
      loading: false, //取消loading
    })
  },
  tableUpdata(data){
    return request({
      url: basicApi.tableUpdata,
      method: 'post',
      data
    })
  },
  tableDelete(data){
    return request({
      url: basicApi.tableDelete,
      method: 'post',
      data,
    })
  },
  tableDeletes(data){
    return request({
      url: basicApi.tableDeletes,
      method: 'post',
      data,
    })
  }
}

export default tableApi
