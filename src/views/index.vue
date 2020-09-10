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
      isCollapse: false,
      menuList:menu
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
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
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
    .home-article {
      border: 10px solid #f5f5f5;
      padding: 10px;
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