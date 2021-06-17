<template>
  <div class="dialog-container">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @close="$emit('update:show', false);$emit('closeDialogFunc')"
      :show="show"
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if="isShowFooter">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="onConfirm">{{onConfirmBtnName}}</el-button>
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
    },
    isShowFooter:{
      type: Boolean,
      default: true,
    },
    onConfirmBtnName:{
      type: String,
      default: '确 定',
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  methods: {
    closeDialog(){
      this.$emit('close-dialog-func')
      this.visible = false
    },
  }
};
</script>