<!-- 基础页面 -->
<template>
  <div class="home">
    <header class="home-header">
      <Header :isCollapse="isCollapse" @onclickCollapse="onclickCollapse" />
    </header>
    <main class="home-main">
      <aside class="home-aside">
        <Sideber :isCollapse="isCollapse" :menuList="menuList"/>
      </aside>
      <article :class="{'home-article': true, 'home-article-nocollapse': !isCollapse, 'home-article-collapse': isCollapse}">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" class="home-article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
            {{item}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </article>
    </main>
  </div>
</template>

<script>
import Sideber from "@/components/Sideber";
import Header from "@/components/Header";
import menu from "@/assets/js/menu";
export default {
  name: "home",
  components: {
    Sideber,
    Header,
  },
  data() {
    return {
      isCollapse: false, //菜单默认不收缩
      menuList:menu //菜单数据
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //控制菜单栏的收缩/展开
    onclickCollapse(headerIsCollapse) {
      this.isCollapse = headerIsCollapse;
    },
  },
};
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  .home-header {
    height: 45px;
    border-bottom: 2px solid #f5f5f5;
  }
  .home-main {
    background: #f5f5f5;  
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
    .home-aside{
      background: #fff; 
    }
    .home-article {
      background: #fff; 
      margin: 10px;
      padding: 10px;
      min-width: 960px;
      .home-article-breadcrumb{
        margin-bottom: 20px;
      }
    }
    .home-article-nocollapse{
      flex: 1;
      width: calc(100% - 200px);
    }
    .home-article-collapse{
      transition: width 0.31s;
      width: calc(100% - 64px);
    }
  }
}
</style>