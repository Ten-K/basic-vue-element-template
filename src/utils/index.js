/*
 * @Descripttion: 全局方法: 已挂载到vue实例，可通过this.$_.xxx调用
 * @Author: Lrl
 * @Date: 2020-09-09 09:51:50
 * @LastEditors: Lrl
 * @LastEditTime: 2020-09-09 10:25:20
 */

let utils = {
  //封装操作localstorage本地存储的方法
  //存储
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key);
  }

}

// 暴露给外部访问
export default utils;