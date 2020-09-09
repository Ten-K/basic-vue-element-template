<!-- 菜单组件 -->
<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="selectPath"
      router
    >
      <template v-for="(item,idx) in menuConfig">
        <el-submenu v-if="item.children" :index="item.path" :key="idx">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIdx) in item.children"
            :key="(subIdx+1) * 5"
            :index="subItem.path"
          >{{subItem.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="idx">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "saberMenu",
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      menuConfig: [
        {
          icon: "el-icon-platform-eleme",
          path: "/components",
          name: "components",
          children: [
            {
              icon: "el-icon-location",
              path: "/components/table",
              name: "Table",
            },
            {
              icon: "el-icon-location",
              path: "/components/form",
              name: "Form",
            },
          ],
        },
        {
          icon: "el-icon-location",
          path: "/log",
          name: "log",
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    selectPath(index){
      console.log(index)
    }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>