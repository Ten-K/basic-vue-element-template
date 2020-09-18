<!-- 模拟vuex -->
<template>
  <div>
    <h1>{{count}}</h1>
    <el-button @click="getAddCount(1)">+</el-button>
    <el-button @click="getDelCount(1)">-</el-button>
  </div>
</template>

<script>
let self;
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState(["count"]),
    // ...mapGetters(["getCount"]),
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this;
    //使用sessionStorage防止页面刷新时vuex的数据丢失
    if (sessionStorage.getItem("store") ) {
      self.$store.replaceState(Object.assign({}, self.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(self.$store.state))
    })
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // ...mapMutations(["addCount", "delCount"]),
    ...mapActions(["getAddCount", "getDelCount"]),
  },
  //组件销毁前
  beforeDestroy(){
    window.removeEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(self.$store.state))
    })
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>