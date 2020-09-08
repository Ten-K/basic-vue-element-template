<!-- 基础页面 -->
<template>
  <div class="home">
    <header class="home-header">
      <Header :isCollapse="isCollapse" @onclickCollapse="onclickCollapse" />
    </header>
    <main class="home-main">
      <aside class="home-aside">
        <saberMenu :isCollapse="isCollapse" />
      </aside>
      <article class="home-article">
        <router-view></router-view>
      </article>
    </main>
  </div>
</template>

<script>
import saberMenu from "@/components/saberMenu";
import Header from "@/components/Header";
export default {
  name: "home",
  components: {
    saberMenu,
    Header,
  },
  data() {
    return {
      isCollapse: false,
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
/* @import url(); 引入css类 */
.home {
  width: 100%;
  height: 100%;
  .home-header {
    height: 45px;
    border-bottom: 2px solid #f5f5f5;
  }
  .home-main {
    width: 100%;
    height: calc(100% - 45px);
    display: flex;
    .home-aside {
      .isCollapse {
        margin-left: 50px;
      }
    }
    .home-article {
      box-sizing: border-box;
      width: calc(100% - 200px);
      border: 10px solid #f5f5f5;
      padding: 10px;
    }
  }
}
</style>