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
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // ...mapMutations(["addCount", "delCount"]),
    ...mapActions(["getAddCount", "getDelCount"]),
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>