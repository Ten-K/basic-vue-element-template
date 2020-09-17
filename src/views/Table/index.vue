<!-- CommTable/CommDialog组件测试 -->
<template>
  <div class="G-home">
    <CommTable
      :tableData="tableData"
      :columns="columns"
      :pageObj="pageObj"
      :ButtonLeft="ButtonLeft"
      :ButtonRight="ButtonRight"
      :spanArr="spanArr"
      :preTestingGroupsIdx="3"
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
    </CommTable>
    <!-- 新建/编辑/测试/删除测试 -->
    <CommDialog :show.sync="isDialog" :title="dialogTitle" :onConfirm="testonConfirm">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        size="small"
        v-show="dialogTitle === '新增' || dialogTitle ==='编辑'"
      >
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
      <h1 v-show="dialogTitle === '测试' || dialogTitle ==='删除测试'">测试/删除测试</h1>
    </CommDialog>
  </div>
</template>

<script>
let self;
import CommTable from "@/components/CommTable";
import CommDialog from "@/components/CommDialog";
export default {
  components: {
    CommTable,
    CommDialog,
  },
  name:"eltable",
  data() {
    return {
      //Table组件info
      ButtonLeft: [
        {
          type: "primary",
          name: "新增",
          onClick: () => {
            this.newOrEditDialog("新增");
          },
        },
        {
          type: "primary",
          name: "测试",
          onClick: () => {
            this.newOrEditDialog("测试");
          },
        },
      ],
      ButtonRight: [
        {
          type: "danger",
          name: "批量删除",
          onClick: () => {
            this.deleteRows("批量删除");
          },
        },
        {
          type: "danger",
          name: "删除测试",
          onClick: () => {
            this.newOrEditDialog("删除测试");
          },
        },
      ],
      tableData: [],
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
      //Dialog组件info
      dialogTitle: "新增",
      form: {
        name: "",
        region: "",
      },
      spanArr: [],
      pos: 0,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this;
    self.$api.tableApi.tableList().then((res) => {
        if(res){
          self.tableData = res.data
          self.getSpanArr()
        }
    });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!"); 
    },
    pageTurning(currentPage) {
      console.log(currentPage);
    },
    //因为要合并的行数是不固定的，此函数是实现合并随意行数的功能
    getSpanArr() {
      self.spanArr = [];
      for (var i = 0; i < self.tableData.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          self.spanArr.push(1);
          self.pos = 0;
        } else {
          if (
            self.tableData[i].creationTime ===
            self.tableData[i - 1].creationTime
          ) {
            // 如果creationTime相等就累加，并且push 0
            self.spanArr[self.pos] += 1;
            self.spanArr.push(0);
          } else {
            // 不相等push 1
            self.spanArr.push(1);
            self.pos = i;
          }
        }
      }
      // console.log(self.spanArr,self.spanArrTwo)
    },
    //点击Dialog确认按钮
    testonConfirm() {
      self.isDialog = false;
    },
    //点击新增或编辑按钮
    newOrEditDialog(title = null) {
      self.dialogTitle = title;
      self.isDialog = true;
    },
    //勾选的数据
    handleSelectionChange(val) {
      console.log(val);
    },
    //删除
    deleteRow() {
      self.$message({
        message: "删除成功",
        type: "success",
      });
    },
    //批量删除
    deleteRows() {
      self
        .$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          self.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          self.$message({
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