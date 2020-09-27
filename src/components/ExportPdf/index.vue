<!-- 将html转化为pdf并导出 -->
<template>
  <div class="home">
    <el-button id="exportToPdf" @click="openPdf">预览PDF</el-button>
    <CommDialog
      :show.sync="isDialog"
      :title="'预览'"
      :onConfirmBtnName="'导 出'"
      :onConfirm="exportToPdf"
    >
      <div id="export_content" class="export_content">
        <h1 v-for="(i, index) in contentData" :key="index" class="pdfcontent">
          {{ i.name }}
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.name }}
          </div>
        </h1>
      </div>
    </CommDialog>
  </div>
</template>

<script>
import CommDialog from "@/components/CommDialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
  components: {
    CommDialog,
  },
  name: "exportPdf",
  props: {
    contentData: {
      type: Array,
      default: () => {
        return [{ name: "测试1" }, { name: "测试2" }];
      },
    },
  },
  data() {
    return {
      isDialog: false,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    openPdf() {
      this.isDialog = true;
    },
    exportToPdf() {
      html2canvas(document.getElementById("export_content"), {
        scale: 2,
        background: "#FFF", //如果指定的div没有设置背景色会默认成黑色,这里是个坑
      }).then((canvas) => {
        //未生成pdf的html页面高度
        var leftHeight = canvas.height;
        var a4Width = 190;
        var a4Height = 277; //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
        //一页pdf显示html页面生成的canvas高度;
        var a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height);
        //pdf页面偏移
        var position = 0;
        var pageData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF("p", "mm", "a4"); //A4纸，纵向
        var index = 1,
          canvas1 = document.createElement("canvas"),
          height;
        pdf.setDisplayMode("fullwidth", "continuous", "FullScreen");
        var pdfName = "导出pdf测试";
        function createImpl(canvas) {
          console.log(leftHeight, a4HeightRef);
          if (leftHeight > 0) {
            index++;
            var checkCount = 0;
            if (leftHeight > a4HeightRef) {
              var i = position + a4HeightRef;
              for (i = position + a4HeightRef; i >= position; i--) {
                var isWrite = true;
                for (var j = 0; j < canvas.width; j++) {
                  var c = canvas.getContext("2d").getImageData(j, i, 1, 1).data;

                  if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                    isWrite = false;
                    break;
                  }
                }
                if (isWrite) {
                  checkCount++;
                  if (checkCount >= 10) {
                    break;
                  }
                } else {
                  checkCount = 0;
                }
              }
              height =
                Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
              if (height <= 0) {
                height = a4HeightRef;
              }
            } else {
              height = leftHeight;
            }

            canvas1.width = canvas.width;
            canvas1.height = height;

            var ctx = canvas1.getContext("2d");
            ctx.drawImage(
              canvas,
              0,
              position,
              canvas.width,
              height,
              0,
              0,
              canvas.width,
              height
            );

            var pageHeight = Math.round((a4Width / canvas.width) * height);
            if (position != 0) {
              pdf.addPage();
            }
            pdf.addImage(
              canvas1.toDataURL("image/jpeg", 1.0),
              "JPEG",
              10,
              10,
              a4Width,
              (a4Width / canvas1.width) * height
            );
            //添加页脚
            pdf.text(104,295,`${index - 1}`)
            leftHeight -= height;
            position += height;
            if (leftHeight > 0) {
              setTimeout(createImpl, 100, canvas);
            } else {
              pdf.save(pdfName + ".pdf");
            }
          }
        }

        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < a4HeightRef) {
          pdf.addImage(
            pageData,
            "JPEG",
            0,
            0,
            a4Width,
            (a4Width / canvas.width) * leftHeight
          );
          pdf.save(pdfName + ".pdf");
        } else {
          try {
            pdf.deletePage(0);
            setTimeout(createImpl, 100, canvas);
          } catch (err) {
            // console.log(err);
          }
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.home {
  height: 40px;
  .export_content {
    .pdfcontent {
      margin: 10px;
    }
  }
}
</style>