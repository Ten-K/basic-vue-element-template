<!-- commForm组件测试 -->
<template>
    <CommForm
      class="searchInput"
      labelWidth="100px"
      ref="searchForm"
      :searchData="searchData"
      :searchForm="searchForm"
      @search="search"
    />
</template>
<script>
let self
import CommForm from "@/components/CommForm";
export default {
  components: {
    CommForm
  },
  name:"elform",
  data() {
    let caseState = [
      { label: "男", value: 1 },
      { label: "女", value: 2 }
    ];
    let entrustProps = { label: "label", value: "value" };
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      // 如果数据要回显后不可编辑，使用JSON.parse(JSON.stringify())转换
      searchData: {
        
      },
      searchForm: [
        {
          type: "Daterange",
          label: "日期",
          prop: "daterange",
          width: "180px",
          placeholder: "请输入",
          change: row => {
            this.changeDaterange(row);
          },
        },
        {
          type: "Input",
          label: "人员姓名",
          prop: "name",
          width: "180px",
          placeholder: "请输入",
          input: row =>{
            this.inputName(row);
          },
          // 表单验证
          rules: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
        },
        {
          type: "Input",
          label: "手机号",
          prop: "phone",
          width: "180px",
          placeholder: "请输入",
          rules: [{ required: true, validator: checkPhone, trigger: "blur" }]
        },

        {
          type: "Select",
          label: "性别",
          prop: "sex",
          // 渲染数组
          options: caseState,
          // 下拉转换
          props: entrustProps,
          change: row => {
            this.changeSex(row);
          },
          placeholder: "请选择性别",
          rules: [{ required: true, message: "请选择性别", trigger: "change" }]
        },
        {
          type: "Select",
          label: "所属公司",
          prop: "companyId",
          options: [],
          props: entrustProps,
          change: row => {
            this.changeCompany(row);
          },
          placeholder: "请选择所属公司",
          rules: [{ required: true, message: "请选择所属公司", trigger: "change" }]
        },
        {
          type: "Select",
          label: "所属部门",
          prop: "deptId",
          options: [],
          props: entrustProps,
          change: row => {
            this.changeDepar(row);
          },
          placeholder: "请选择所属部门",
          rules: [{ required: true, message: "请选择所属部门", trigger: "change" }]
        }
      ],
      ruleForm: {},
      seachInfo:{
        sex:-1
      },
      name:null
    };
  },
  created(){
    self = this
  },
  methods: {
    //搜索, 重置表单:初始化搜索
    search(val){
      console.log(val)
    },
    inputName(row){
      console.log(row)
    },
    changeSex(row){
      self.seachInfo.sex = row
    },
    // 下拉选择分公司，查询部门数据
    changeCompany(row) {
      console.log(row)
    },
    // 下拉选择部门，查询职位数据
    changeDepar(row) {
      console.log(row)
    },
    // 职位下拉事件
    changePosition(row) {
      console.log(row)
    },
    //日期
    changeDaterange(row){
      console.log(row)
    },
  }
};
</script>