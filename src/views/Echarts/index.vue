<template>
  <div>
    <div id="first" class="item"></div>
    <div id="two" class="item"></div>
    <div id="three" class="item"></div>
  </div>
</template>
<script type="text/javascript">
import echarts from "echarts";

export default {
  name: "echarts",
  data() {
    return {
      first_option: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
      two_option: {
        backgroundColor: "#45515a",
        //标题
        title: {
          text: "流量来源",
          subtext: "饼图示例",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
            fontStyle: "italic", //标题字体
          },
        },
        //弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: "item", //以具体项目触发弹窗
          /*
    内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
    value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
    */
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        //图例，选择要显示的项目
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#c8c8d0",
          },
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"], //注意要和数据的name相对应
        },
        //工具箱
        toolbox: {
          show: true, //显示工具箱
          feature: {
            dataView: { show: true }, //以文字形式显示数据
            restore: { show: true }, //还原
            //dataZoom:{show:true}, //区域缩放
            saveAsImage: { show: true }, //保存图片
            //magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          },
        },
        //视觉映射组件，将数据映射到视觉元素上
        visualMap: {
          show: false,
          min: 10,
          max: 650,
          dimension: 0, //选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
          // seriesIndex: 4, //选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
          inRange: {
            //选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
            color: ["red"],
            colorLightness: [0, 1],
            colorSaturation: [0, 1],
          },
        },
        //数据
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius", //角度和半径展现百分比，'area'只用半径展现
            label: {
              //饼图图形的文本标签
              normal: {
                //下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              },
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                smooth: 0.5, //0-1，越大越平滑弯曲
                length: 10, //从块到文字的第一段长
                length2: 20, //拐弯到文字的段长
              },
            },
            itemStyle: {
              //图例样式
              normal: {
                color: "#97413c",
                shadowBlur: 50, //阴影模糊程度
                shadowColor: "rgba(0, 0, 0, 0.5)", //阴影颜色，一般黑
              },
            },

            animationType: "scale", //初始动画效果，scale是缩放，expansion是展开
            animationEasing: "elasticOut", //初始动画缓动效果
            animationDelay: function (idx) {
              //数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200;
            },
          },
        ],
      },
      three_option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
            ],
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3,
            ],
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2,
            ],
          },
        ],
      },
    };
  },
  mounted() {
    let first = echarts.init(document.getElementById("first"));
    first.setOption(this.first_option);

    let two = echarts.init(document.getElementById("two"));
    two.setOption(this.two_option);

    let three = echarts.init(document.getElementById("three"));
    three.setOption(this.three_option);
  },
};
</script>
<style type="text/css" lang="scss" scoped>
.item {
  width: 600px;
  height: 400px;
  margin-left: 50px;
}
</style>
