<!-- Json导出execl -->
<template>
  <div>
    <el-button @click="exportExcel" type="primary">导出excel</el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: "",
  props: {
    excelData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    exportExcel() {
      let sheet = XLSX.utils.aoa_to_sheet(this.excelData);
      sheet["!merges"] = [
        // 设置第一行第一列到第一行第三列的单元格合并
        { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },//设置合并单元格，可根据需求动态设置
      ];
      this.openDownloadDialog(this.sheet2blob(sheet), "导出.xlsx");
    },
    sheet2blob(sheet, sheetName) {
      sheetName = sheetName || "sheet1";
      let workbook = {
        SheetNames: [sheetName],
        Sheets: {},
      };
      workbook.Sheets[sheetName] = sheet;
      // 生成excel的配置项
      let wopts = {
        bookType: "xlsx", // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: "binary",
      };
      let wbout = XLSX.write(workbook, wopts);
      let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
      // 字符串转ArrayBuffer
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      return blob;
    },
    openDownloadDialog(url, saveName) {
      if (typeof url == "object" && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      let aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      let event;
      if (window.MouseEvent) event = new MouseEvent("click");
      else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
      }
      aLink.dispatchEvent(event);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>