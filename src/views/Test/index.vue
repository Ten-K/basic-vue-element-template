<!--  -->
<template>
  <div>
    <h1>test</h1>
  </div>
</template>

<script>
let self
export default {
  name: "",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this
    self.$api.testApi.product().then(res => {
      console.log(res)
    })
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>