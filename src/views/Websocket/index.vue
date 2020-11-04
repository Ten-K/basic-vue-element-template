<!-- 简易WebSocket -->
<template>
  <div class="G-home">
    <div class="content" ref="box">
      <div
        v-for="(item, index) in list"
        :class="[item.type, 'msg-item']"
        :key="index"
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
    <el-input
      class="G-mgtb-5"
      type="text"
      v-model="contentText"
      @keyup.enter.native="sendText"
      placeholder="回车发送消息"
    ></el-input>
    <el-button @click="sendText">发送</el-button>
  </div>
</template>

<script>
let self;
export default {
  name: "ws",
  data() {
    return {
      list: [], //聊天记录的数组
      contentText: "", //input输入的值
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this;
    if (self.$_.isEmptyObject(self.$_.get("infolist"))) return;
    self.list = self.$_.get("infolist");
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //发送聊天信息
    sendText() {
      if (self.$_.isEmptyObject(self.contentText)) return self.$message.info('不能发送空白信息');
      self.list = [...self.list, { type: "mine", content: self.contentText }]; //通过type字段进行区分是自己（mine）发的还是系统（robot）返回的
      self.backText(function () {
        self.contentText = ""; //加回调在得到返回数据的时候清除输入框的内容
      });
    },
    backText(callback) {
      if (window.WebSocket) {
        let ws = new WebSocket("ws://localhost:8001");
        ws.onopen = function (e) {
          console.log("连接服务器成功");
          ws.send(self.contentText);
          callback();
        };
        ws.onclose = function (e) {
          console.log("服务器关闭");
          self.$message({
            type: "warning",
            message: "请启动WebSocket服务",
          });
        };
        ws.onerror = function () {
          console.log("服务器出错");
        };
        ws.onmessage = function (e) {
          self.list = [...self.list, { type: "robot", content: e.data }];
          self.$_.set("infolist", self.list);
        };
      }
    },
  },
  watch: {
    // 监听list,当有修改的时候进行div的屏幕滚动，确保能看到最新的聊天
    list: function () {
      setTimeout(() => {
        self.$refs.box.scrollTop = self.$refs.box.scrollHeight;
      }, 0);
      //加setTimeout的原因：由于vue采用虚拟dom，我每次生成新的消息时获取到的div的scrollHeight的值是生成新消息之前的值，所以造成每次都是最新的那条消息被隐藏掉了
    },
  },
};
</script>
<style scoped lang="scss">
.G-home {
  .content {
    width: 20%;
    height: 40%;
    border: 1px solid #999;
    background: #f8f8ff;
    overflow: auto;
    .msg-item {
      position: relative;
      overflow: hidden;
      p {
        display: inline-block;
        border-radius: 10px;
        text-align: left;
        color: #666;
        padding: 2px 12px;
        margin: 0 0 2px 0;
        max-width: 70%;
        box-sizing: border-box;
        word-wrap: break-word;
        word-break: normal;
      }
    }
    .mine {
      p {
        float: right;
        background: greenyellow;
      }
    }
    .robot {
      p {
        background: #fff;
      }
    }
  }
  /deep/ .el-input__inner {
    width: 20%;
  }
}
</style>