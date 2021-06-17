<!-- 基础页面 -->
<template>
  <div class="home">
    <header class="home-header">
      <Header :isCollapse="isCollapse" @onclickCollapse="onclickCollapse" @editableTabsValueFunc="editableTabsValueFunc"/>
    </header>
    <main class="home-main">
      <aside class="home-aside">
        <Sideber :isCollapse="isCollapse" :menuList="menuList"/>
      </aside>
      <article :class="{'home-article': true, 'home-article-nocollapse': !isCollapse, 'home-article-collapse': isCollapse}">
        <!-- tabs标签栏 -->
        <div class="tab-title">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-click="selectTabs"
            @tab-remove="removeTabs"
            class="tabs">
            <el-tab-pane
              :key="item.path"
              v-for="item in editableTabs"
              :label="item.title"
              :name="item.path"
            >
            </el-tab-pane>
          </el-tabs>
          <i class="el-icon-circle-close close-tabs" @click="closeTabs"></i>
        </div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator="/" class="home-article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
            {{item}}
          </el-breadcrumb-item>
        </el-breadcrumb> -->
        <keep-alive>
          <router-view class="view-wraaper"/>
        </keep-alive>
      </article>
    </main>
  </div>
</template>

<script>
import Sideber from "@/components/Sideber";
import Header from "@/components/Header";
import tabsBus from '../assets/js/tabsEventBus';
export default {
  name: "home",
  components: {
    Sideber,
    Header,
  },
  data() {
    return {
      isCollapse: false, //菜单默认不收缩
      editableTabsValue: '/home',
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
      //在页面刷新时将editableTabsValue的信息保存到Storage里
      window.addEventListener("beforeunload",()=>{
        this.$_.set('editableTabsValue',this.editableTabsValue)
      })
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.editableTabsValue = this.$_.get('editableTabsValue') || '/home'
    //点击菜单
    tabsBus.$on('getselectPath',(key) => {
      this.editableTabsValue = key
      let result = this.editableTabs.find(data => { return key === data.path })
      if (!result) {
        this.searchMenu(this.menuList, key)
      }
    })
  },
  computed: {
    editableTabs () {
      return this.$store.state.modulePagesTab.pageTabsList
    },
    menuList () {
      return this.$store.state.modulePermission.menuList
    }
  },
  methods: {
    //点击首页图标
    editableTabsValueFunc(){
      this.editableTabsValue = '/home'
    },
    //控制菜单栏的收缩/展开
    onclickCollapse(headerIsCollapse) {
      this.isCollapse = headerIsCollapse;
    },
    // 查找菜单
    searchMenu (arr, key) {
      arr.forEach(v => {
        if (v.href === key) {
          let obj = {
            title: v.title,
            path: v.href
          }
          this.$store.commit('addTag', obj)
        } else if (!v.children) {
          return false
        } else {
          this.searchMenu(v.children, key)
        }
      })
    },
    // 选择tabs
    selectTabs (e) {
      if (this.activeMenu != e.name) {
        this.$router.push({path: e.name})
      }
    },
    // 移除tabs
    removeTabs (e) {
      if(e === '/home') return
      let tabs = this.$store.state.modulePagesTab.pageTabsList
      let index = tabs.findIndex(data => { return data.path === e })
      if (index !== -1) {
        let nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          this.editableTabsValue = nextTab.path
          this.$router.push({path: nextTab.path})
        }
        this.$store.commit('removeTag', e)
      }
    },
    // 清空tabs
    closeTabs () {
      this.$store.commit('clearTag')
      this.$router.push({path: '/home'})
      this.editableTabsValue = this.$options.data().editableTabsValue
    },
  },
  //组件销毁前
  beforeDestroy(){
    window.removeEventListener("beforeunload",()=>{
      this.$_.set('editableTabsValue',this.editableTabsValue)
    })
  }
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
      overflow: auto;
      background: #fff;
      min-width: 960px;
      margin: 10px;
      .tab-title {
        display: flex;
        background: #fff;
        align-items: center;
        .tabs {
          padding-top:8px;
          height:55px;
          flex: 1;
        }
        .close-tabs {
          font-size: 20px;
          color: #999;
          cursor: pointer;
          margin: 0 20px;
        }
        .close-tabs:hover {
          color: #409EFF;
        }
      }
      .view-wraaper{
        overflow: auto;height: calc(100% - 55px);
      }
      .home-article-breadcrumb{
        padding: 3px 0 3px 5px;
        border-bottom: 5px solid #f5f5f5;
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
/deep/ .el-submenu .el-menu-item:hover {
  background: rgba(22,119,255,0.10) !important;
  color: #1677FF !important;
}
</style>