<!-- 回车跳转 -->
<template>
  <div>
    <h1>回车可跳转到下一个输入框</h1>
    <hr style="margin:20px 0" />
    <el-form ref="form" :model="form" label-width="80px" v-enterJump size="small">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" v-focus></el-input>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select
          v-model="form.region"
          placeholder="请选择活动区域"
          name="select"
          ref="select"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// let self
export default {
  name: "enterjump",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // self = this
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>