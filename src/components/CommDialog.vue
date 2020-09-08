<template>
  <div class="dialog-container">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <span>this is a dialog.</span>
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title:{
      type: String,
      default: 'title',
    },
    onConfirm:{
      type: Function,
      default: ()=>{},
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
};
</script>