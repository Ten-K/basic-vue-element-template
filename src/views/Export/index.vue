<!-- 导出 -->
<template>
  <div>
    <ExportPdf />
  </div>
</template>

<script>
import ExportPdf from '@/components/ExportPdf'
export default {
  name: "export",
  components:{
    ExportPdf
  },
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>