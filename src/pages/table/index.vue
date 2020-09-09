<!-- table封装 -->
<template>
  <div class="G-home">
    <commTable
      :tableData="tableData"
      :columns="columns"
      :pageObj="pageObj"
      :ButtonLeft="ButtonLeft"
      :ButtonRight="ButtonRight"
      @handleSelectionChange="handleSelectionChange"
    >
      <el-table-column
        slot="username"
        label="操作人"
        align="left"
        width="200"
        :resizable="false"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{scope.row.username === '1' ? 'lrl' : 'test'}}</template>
      </el-table-column>
      <el-table-column
        slot="test"
        label="操作"
        align="left"
        width="200"
        :resizable="false"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button size="mini" class="G-mgr-5" @click="newOrEditDialog('编辑')">编辑</el-button>
          <el-popconfirm
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="deleteRow(scope.row)"
          >
            <el-button type="danger" size="mini" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </commTable>
    <!-- 新建 -->
    <commDialog :show.sync="isDialog" :title="dialogTitle" :onConfirm="testonConfirm">
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </commDialog>
  </div>
</template>

<script>
import commTable from "@/components/CommTable";
import commDialog from "@/components/CommDialog";
export default {
  components: {
    commTable,
    commDialog,
  },
  data() {
    return {
      ButtonLeft: [
        { type: "primary", name: "新增", onClick: this.newOrEditDialog },
      ],
      ButtonRight: [
        { type: "danger", name: "批量删除", onClick: this.deleteRows },
      ],
      tableData: [
        { operateContent: "测试1", username: "1", creationTime: "2020-09-08" },
        { operateContent: "测试2", username: "2", creationTime: "2020-09-08" },
      ],
      columns: [
        { label: "操作内容", prop: "operateContent" },
        { slot: "username" },
        { label: "操作时间", prop: "creationTime" },
        { slot: "test" },
      ],
      pageObj: {
        sizes: [10, 20, 30, 40],
        size: 10,
        total: 1,
        currentPage: 1,
        func: (currentPage) => {
          this.pageTurning(currentPage);
        },
      },
      isDialog: false,
      dialogTitle: "新增",
      form: {
        name: "",
        region: "",
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //点击Dialog确认按钮
    testonConfirm() {
      this.isDialog = false;
      console.log(this.form)
    },
    //点击新增或编辑按钮
    newOrEditDialog(title) {
      this.isDialog = true;
      Object.prototype.toString.call(title) === "[object String]"
        ? (this.dialogTitle = title)
        : (this.dialogTitle = "新增");
    },
    //勾选的数据
    handleSelectionChange(val) {
      console.log(val);
    },
    //删除
    deleteRow() {
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },
    //批量删除
    deleteRows() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>