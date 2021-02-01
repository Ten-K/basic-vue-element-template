<!-- 导出 -->
<template>
  <div class="G-home G-flex">
    <ExportPdf :pdfData="pdfData" />
    <ExportExcel class="G-mgl-5" :excelData="excelData" />
  </div>
</template>

<script>
import ExportPdf from "@/components/ExportPdf";
import ExportExcel from "@/components/ExportExcel";
export default {
  name: "export",
  components: {
    ExportPdf,
    ExportExcel,
  },
  data() {
    return {
      excelData: [ //导处xlxs的数据
        ["主要信息", null, null, "其他信息"],
        ["姓名", "性别", "年龄", "注册时间"],
        ["张三", "男", 18, new Date()],
        ["李四", "女", 22, new Date()],
      ],
      //导处pdf的数据
      pdfData: [{ name: "测试1" }, { name: "测试2" }],
    };
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