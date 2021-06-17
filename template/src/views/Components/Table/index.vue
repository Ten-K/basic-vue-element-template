<!-- CommForm/CommTable/CommDialog组件测试 -->
<template>
  <div class="G-home">
    <header class="home-header">
      <CommForm
        labelWidth="100px"
        ref="searchForm"
        :searchData="searchData"
        :searchForm="searchForm"
        @search="search"
      ></CommForm>
    </header>
    <main class="home-container">
      <CommTable
      :tableData="tableData.slice((pageObj.currentPage - 1)*pageObj.size,pageObj.currentPage*pageObj.size)"
      :columns="columns"
      :pageObj="pageObj"
      :ButtonLeft="ButtonLeft"
      :ButtonRight="ButtonRight"
      :spanArr="spanArr"
      :mergeColumns="3"
      @handleSelectionChange="handleSelectionChange"
      @handleClick="handleClick"
    >
      <el-table-column slot="username" label="操作人" align="left" width="200" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.username === '1' ? 'lrl' : 'test'}}</template>
      </el-table-column>
      <el-table-column
        slot="createTime"
        label="操作时间"
        align="left"
        width="200"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
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
            @onConfirm="deleteRow(scope.row._id)"
          >
            <el-button type="danger" size="mini" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </CommTable>
    </main>
    <!-- 新建/编辑/测试/删除测试 -->
    <CommDialog :show.sync="isDialog" :title="dialogTitle" :isShowFooter="false">
      <el-form
        :model="form"
        label-width="80px"
        size="small"
        v-show="dialogTitle === '新增' || dialogTitle ==='编辑'"
      >
        <el-form-item label="操作内容">
          <el-input v-model="form.operateContent"></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-select v-model="form.username" placeholder="请选择操作人">
            <el-option label="lrl" value="1"></el-option>
            <el-option label="test" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
            v-model="form.createTime"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave(dialogTitle)">确认</el-button>
          <el-button @click="isDialog = false">取消</el-button>
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
import CommForm from "@/components/CommForm";
export default {
  components: {
    CommTable,
    CommDialog,
    CommForm,
  },
  name: "eltable",
  data() {
    let caseState = [
      { label: "lrl", value: '1' },
      { label: "test", value: '2' }
    ];
    let entrustProps = { label: "label", value: "value" };
    return {
      //表单info
      searchData: {
        
      },
      searchForm: [
        {
          type: "Select",
          prop: "keyword",
          // 渲染数组
          options: caseState,
          // 下拉转换
          props: entrustProps
        }
      ],
      //Table组件info
      selectList: [],
      ButtonLeft: [
        {
          type: "primary",
          name: "新增",
          icon: "el-icon-plus",
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
          icon:"el-icon-delete",
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
      tableData: [],//表格内容数据
      columns: [//表头数据
        { label: "操作内容", prop: "operateContent" },
        { slot: "username" },
        { slot: "createTime" },
        { slot: "test" },
      ],
      pageObj: {//分页数据
        sizes: [10, 20, 30, 40],
        size: 10,
        total: 1,
        currentPage: 1,
        func: (currentPage) => {//当前页
          this.pageTurning(currentPage);
        },
        sizeFunc: (size) => {//当前显示条数
          this.handleSizeChange(size);
        },
      },
      isDialog: false,
      //Dialog组件info
      dialogTitle: "新增",
      form: {
        index: -1,
        userid: -1,
        username: -1,
        operateContent: "",
        createTime: "",
      },
      spanArr: [],
      pos: 0,
    };
  },
  filters: {
    formatTime: function (time) {
      let d = new Date(time);
      let times =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return times;
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this;
    self.getTableList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //搜索/重置
    search(val){
      self.pageObj.currentPage = 1
      self.getTableList(val);
    },
    //获取列表数据
    getTableList(val) {
      let obj = {
        pageSize: self.pageObj.size,
        curPage: self.pageObj.currentPage,
        data:{
          keyword: val ? val.keyword : null
        }
      }
      self.$api.tableApi.tableList(obj).then((res) => {
        self.tableData = [];
        if (res) {
          self.pageObj.total = res.total
          self.tableData = res.data;
          self.getSpanArr();
        }
      });
    },
    //显示第n页
    pageTurning(currentPage) {
      self.pageObj.currentPage = currentPage
      self.getTableList()
    },
    //一页显示n条数据
    handleSizeChange(size){
      self.pageObj.size = size
      self.getTableList()
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
            self.$_.formatTime(self.tableData[i].createTime) ===
            self.$_.formatTime(self.tableData[i - 1].createTime)
          ) {
            // 如果createTime相等就累加，并且push 0
            self.spanArr[self.pos] += 1;
            self.spanArr.push(0);
          } else {
            // 不相等push 1
            self.spanArr.push(1);
            self.pos = i;
          }
        }
      }
      // console.log(self.spanArr)
    },
    //点击新增或编辑按钮
    newOrEditDialog(title = null) {
      if (title === "新增") {
        self.form = {
          operateContent: "",
          username: "",
          createTime: ""
        };
      }
      self.dialogTitle = title;
      self.isDialog = true;
    },
    //确认新增或确认编辑
    onSave(title) {
      let { operateContent, username, createTime } = self.form;
      let obj = {
        operateContent,
        username,
        createTime
      };
      if (title === "新增") {
        self.$api.tableApi.tableAdd(obj).then((res) => {
          if (res) {
            self.getTableList();
            self.$message({
              type: "success",
              message: "添加成功",
            });
            self.isDialog = false;
          }
        });
      } else {
        let { _id } = self.form;
        obj._id = _id;
        self.$api.tableApi.tableUpdata(obj).then((res) => {
          if (res) {
            self.getTableList();
            self.$message({
              type: "success",
              message: "编辑成功",
            });
            self.isDialog = false;
          }
        });
      }
    },
    //勾选的数据
    handleSelectionChange(val) {
      self.selectList = val;
    },
    //点击行
    handleClick(val) {
      if (val) {
        Object.keys(val).forEach((key) => {
          self.form[key] = val[key];
        });
      }
    },
    //删除
    deleteRow(_id) {
      self.$api.tableApi.tableDelete({ _id }).then((res) => {
        if (res) {
          self.getTableList();
          self.$message({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },
    //批量删除
    deleteRows() {
      if (self.selectList.length == 0) {
        self.$message({
          message: "请选择需要删除的数据",
          type: "warning",
        });
      } else {
        let ids = [];
        self.selectList.forEach((i) => {
          ids.push(i._id);
        });
        self
          .$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            self.$api.tableApi.tableDeletes({ ids }).then((res) => {
              if (res) {
                self.getTableList();
                self.$message({
                  message: "删除成功",
                  type: "success",
                });
              }
            });
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>