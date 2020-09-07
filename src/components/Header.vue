<!-- 公共头部 -->
<template>
  <div class="home">
    <div class="home-left">公共头部</div>
    <div class="home-right">
      <i class="el-icon-s-fold home-icon" @click="onclickCollapse"></i>
      <div class="login-out" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "herder",
  props:{
    isCollapse:{
      type:Boolean,
      default: () => false
    }
  },
  data() {
    return {
      headerIsCollapse:false
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    onclickCollapse(){
      this.headerIsCollapse = !this.isCollapse
      this.$emit('onclickCollapse',this.headerIsCollapse)
    },
    loginOut(){
      this.$router.push('/login')
    }
  },
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.home{
  display: flex;
  align-items: center;
  .home-left{
    width: 200px;
    height: 45px;
    text-align: center;
    line-height: 45px;
  }
  .home-right{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    .home-icon{
      font-size: 25px;
    }
    .home-icon:hover,.login-out:hover{
      cursor: pointer;
      color: cornflowerblue;
    }
  }
}
</style>