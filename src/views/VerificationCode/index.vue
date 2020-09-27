<!-- 验证码页面 -->
<template>
  <div class="G-home">
    <el-input class="input G-mgr-5" v-model="randomNumber" clearable></el-input>
    <el-button @click="start">生成6位不重复的随机数</el-button>
    <hr class="G-mgtb-5" />
    <div class="G-flex verification-box">
      <el-input 
        clearable
        placeholder="请输入验证码" 
        maxlength="4"
        class="input G-mgr-5" 
        v-model="code"
        @keyup.enter.native="finish">
      </el-input>
      <div @click="refreshCode">
        <Sidentify :identifyCode="identifyCode" class="verification G-mgr-5" />
      </div>
      <el-button type="primary" @click="finish">完成</el-button>
    </div>
  </div>
</template>

<script>
let self;
import Sidentify from "./Identify";
export default {
  name: "verificationCode",
  components: {
    Sidentify,
  },
  data() {
    return {
      randomNumber: "",
      identifyCode: "",
      identifyCodes: "1234567890",
      code: "",
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
  mounted() {
    self.makeCode(this.identifyCodes, 4);
  },
  methods: {
    ///刷新验证码
    refreshCode() {
      self.identifyCode = "";
      self.makeCode(self.identifyCodes, 4);
    },
    makeCode(codes, l) {
      for (let i = 0; i < l; i++) {
        self.identifyCode += codes[self.randomNum(0, codes.length)];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //完成验证
    finish() {
      if (self.$_.isEmptyObject(self.code)) {
        self.$message({
          showClose: true,
          message: "请填写验证码",
          type: "warning",
        });
        return;
      } else if (self.code == self.identifyCode) {
        self.$message({
          showClose: true,
          message: "验证成功",
          type: "success",
        });
      } else {
        self.$message({
          showClose: true,
          message: "验证码错误",
          type: "error",
        });
      }
    },
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
      let str = "";
      for (let i of array) {
        str += i;
      }
      self.randomNumber = str;
    },
  },
};
</script>
<style lang="scss" scoped>
.G-home {
  .input {
    width: 200px;
  }
  .verification-box {
    height: 40px;
    .verification {
      width: 116px;
    }
  }
}
</style>