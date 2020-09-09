<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
/* 全局样式 */
/* -------------------------------------------- */
.G-home{
  width: 100%;
  height: 100%;
}
.G-mgr-5{
  margin-right: 5px;
}
.G-mgl-5{
  margin-left: 5px;
}
/* 水平垂直居中 */
.G-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
/* -------------------------------------------- */
</style>
