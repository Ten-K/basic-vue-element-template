<!-- 菜单组件 -->
<template>
  <div>
    <el-menu
      :class="{'el-menu-vertical-demo':true, 'menu-left':isAddClass}"
      :default-active="$route.path"
      :default-openeds="openeds"
      :collapse="isCollapse"
      @select="selectPath"
      router
    >
      <template v-for="(item,idx) in menuList">
        <el-submenu v-if="item.children" :index="item.href" :key="idx">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}{{item.class}}</span>
          </template>
          <!-- 嵌套循环 -->
          <!-- <el-menu-item :index="itm.href" :key="idx+1 * 33" v-for="(itm,idx) in  item.children">
            <i :class="itm.icon"></i>
            <span slot="title">{{itm.title}}</span>
          </el-menu-item> -->
          <!--递归调用自身-->
          <Sideber :menuList="item.children" :isAddClass="true"></Sideber>
        </el-submenu>
        <el-menu-item v-else :index="item.href" :key="idx">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}{{item.class}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import tabsBus from '../../assets/js/tabsEventBus'
export default {
  name: "Sideber",
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false,
    },
    menuList: {
      type: Array,
      required: false,
    },
    isAddClass: {
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    return {
      openeds: [],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    /*
     *刷新浏览器保持选中 :default-active="$route.path"
     *刷新浏览器保持展开选中的菜单 openeds和需要展开的菜单的:index一致
     */
    let str = this.$route.path
    let index = str.lastIndexOf("/")
    this.openeds = [str.substring(0,index)]
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    selectPath(index) {
      tabsBus.$emit('getselectPath',index)
    },
  },
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.menu-left{
  float: left;
  padding-left: 20px;
  overflow: hidden;
}
.el-menu{
  border: 0;
}
</style>