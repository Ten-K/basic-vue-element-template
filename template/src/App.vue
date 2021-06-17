<template>
    <div id="app"
      class="G-home"
      v-loading="requestLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <router-view/>
    </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    requestLoading: function(){
      return this.$store.state.moduleLoading.requestLoading
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/style/app.scss';
</style>
