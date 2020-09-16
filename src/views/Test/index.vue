<!--  -->
<template>
  <div class="G-home">
    <el-input class="input G-mgr-5" v-model="randomNumber"></el-input>
    <el-button @click="start">生成6位不重复的随机数</el-button>
  </div>
</template>

<script>
let self;
export default {
  name: "",
  data() {
    return {
      randomNumber: "",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this;
    // self.$api.testApi.product().then(res => {
    //   console.log(res)
    // })
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    start() {
      // 定义存放生成随机数的数组
      let array = new Array();
      // 循环N次生成随机数
      for (let i = 0; ; i++) {
        // 只生成6个随机数
        if (array.length < 6) {
          generateRandom();
        } else {
          break;
        }
      }
      // 生成随机数的方法
      function generateRandom() {
        let rand = parseInt(Math.random() * 10);
        for (let i = 0; i < array.length; i++) {
          if (array[i] == rand) {
            return false;
          }
        }
        array.push(rand);
      }
      let str = ''
      for (let i of array) {
        str += i;
      }
      self.randomNumber = str
    },
  },
};
</script>
<style lang="scss" scoped>
.G-home {
  .input {
    width: 200px;
  }
}
</style>