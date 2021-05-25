<!--
 * @Descripttion: 
 * @Author: Lrl
 * @Date: 2021-04-26 19:31:16
 * @LastEditors: Lrl
 * @LastEditTime: 2021-05-17 20:11:59
-->
<!-- 权限管理 -->
<template>
  <div class="G-home">
    <h1>权限管理</h1>
    <CommTable :selection="false"
               :tableData="tableData"
               :columns="columns">
      <el-table-column slot="operate"
                       label="操作"
                       align="left"
                       width="200"
                       :resizable="false"
                       show-overflow-tooltip>
        <template v-slot="scoped">
          <el-button size="mini"
                     class="G-mgr-5"
                     @click="newOrEditDialog('编辑',scoped.row)">编辑</el-button>
        </template>
      </el-table-column>
    </CommTable>
    <CommDialog :show.sync="isDialog"
                :title="dialogTitle"
                :onConfirm="onConfirm"
                @close-dialog-func="closeDialogFunc">
      <el-tree show-checkbox
               node-key="href"
               ref="tree"
               :default-checked-keys="defaultCheckedKeys"
               :data="treeData"
               :props="defaultProps"
               @check="handleNodeCheck">
      </el-tree>
    </CommDialog>
  </div>
</template>

<script>
let self
import CommTable from '@/components/CommTable'
import CommDialog from '@/components/CommDialog'
import baseMenu from '@/assets/js/menu'
export default {
  components: {
    CommTable,
    CommDialog,
  },
  name: 'permision',
  data() {
    return {
      tableItemId: '',
      roleAuthList: [],
      defaultCheckedKeys: [],
      treeData: [
        {
          title: 'components',
          children: [
            {
              title: 'Table',
              href: '/components/table',
            },
            { title: 'Form', href: '/components/form' },
            {
              title: 'Export',
              href: '/components/export',
            },
            {
              title: 'verificationCode',
              href: '/components/verificationCode',
            },
          ],
          href: '/components',
        },
        {
          title: 'enterJump',
          href: '/enterjump',
        },
        {
          title: 'simulationVuex',
          href: '/simulationVuex',
        },
        { title: 'webSocket', href: '/ws' },
        {
          title: 'echarts',
          href: '/echarts',
        },
        {
          title: 'permission',
          href: '/permission',
        },
      ],
      dialogTitle: '',
      isDialog: false,
      defaultProps: {
        label: 'title',
        children: 'children',
      },
      tableData: [],
      columns: [{ label: '角色', prop: 'username' }, { slot: 'operate' }],
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this
    self.getTableList()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    closeDialogFunc(){
      this.$refs.tree.setCheckedKeys([])
      this.isDialog = false
    },
    onConfirm() {
      let obj = {
        _id: this.tableItemId,
        list: this.roleAuthList,
      }
      self.$api.authApi.updateRoleAuth(obj).then((res) => {
        self.getTableList()
        self.closeDialogFunc()
        self.$message.success('编辑成功')
      })
    },
    handleNodeCheck() {
      // 全选 getCheckedKeys()
      // 半选 getHalfCheckedKeys()
      let res = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
      this.roleAuthList = res
    },
    newOrEditDialog(text, tableItem) {
      this.defaultCheckedKeys = []
      this.roleAuthList = []
      tableItem.list.forEach((href) => {
        this.defaultCheckedKeys.push(href)
        this.roleAuthList.push(href)
      })
      // this.treeData = tableItem.treeData
      this.tableItemId = tableItem._id
      self.dialogTitle = text
      self.isDialog = true
    },
    getTableList() {
      let username = self.$_.get('username')
      self.$api.loginApi.getRoleAuthList({ username }).then((res) => {
        self.tableData = []
        res.data.forEach((item) => {
          let treeList = this.$_.getMenu(baseMenu, item.list)
          this.tableData.push({ ...item, treeData: treeList })
        })
      })
    },
  },
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>