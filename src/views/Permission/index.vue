<!-- 权限管理 -->
<template>
  <div class="G-home">
    <h1>权限管理</h1>
    <CommTable
      :selection="false"
      :tableData="tableData"
      :columns="columns">
      <el-table-column 
        slot="operate"
        label="操作"
        align="left"
        width="200"
        :resizable="false"
        show-overflow-tooltip>
        <template v-slot="scoped">
          <el-button 
            size="mini"
            class="G-mgr-5"
            @click="newOrEditDialog('编辑',scoped.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </CommTable>
    <CommDialog :show.sync="isDialog" :title="dialogTitle">
    </CommDialog>
  </div>
</template>

<script>
let self;
let roleMap = new Map();
import CommTable from "@/components/CommTable";
import CommDialog from "@/components/CommDialog";
import baseMenu from '@/assets/js/menu'
export default {
  components: {
    CommTable,
    CommDialog
  },
  name: 'permision',
  data() {
    return {
      copyMenu: [],
      dialogTitle: '',
      isDialog: false,
      tableData: [],
      columns: [
        { label: '角色', prop: 'username' },
        { slot: 'operate' }
      ],
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this;
    self.getTableList();
    baseMenu.forEach(menu => {
      self.copyMenu.push(menu)
    })
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    newOrEditDialog(text,id){
      self.dialogTitle = text
      self.isDialog = true
    },
    getMenu(auths){
      let menu = self.copyMenu.filter(basem =>{
        if(auths.includes(basem.href)){
          if(basem.children){
            basem.children = self.getMenu(basem.children,auths)
          }
          return true
        }
      })
      console.log(menu)
      return menu
    },
    getTableList(){
      let username = self.$_.get('username')
      self.$api.loginApi.getRoleAuthList({username}).then((res) => {
        self.tableData = [];
        if (res) {
          res.data.forEach(item => {
            let treeList = self.getMenu(item.list)
            console.log(treeList)
            roleMap.set(item._id,treeList)
          });
            // console.log(roleMap)
          self.tableData = res.data;
        }
      });
    }
  },
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>