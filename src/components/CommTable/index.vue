<template>
  <div class="home">
    <!-- 表单部分 -->
    <!-- 按钮部分 -->
    <div class="button">
      <div class="button-left">
        <div v-for="i in ButtonLeft" :key="i.name" class="button-left-sub">
          <el-button size="small" :type="i.type" @click="i.onClick" v-if="!i.hide" :icon="i.icon ? i.icon : ''">{{i.name}}</el-button>
        </div>
      </div>
      <div class="button-right">
        <div v-for="i in ButtonRight" :key="i.name" class="button-right-sub">
          <el-button size="small" :type="i.type" @click="i.onClick" v-if="!i.hide" :icon="i.icon ? i.icon : ''">{{i.name}}</el-button>
        </div>
      </div>
    </div>
    <!-- 表格部分 -->
    <el-table
      height="100%"
      style="min-height:500px"
      size="mini"
      :stripe="true"
      ref="commonTable"
      :data="tableData"
      border
      v-loading="loading"
      highlight-current-row
      :span-method="!spanArr.length ? null : objectSpanMethod"
      @current-change="handleClick"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column v-if="selection && columns.length" type="selection" width="40"></el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="left"
        v-if="isShowIndex && columns.length"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <!-- 有分页时，序号显示 -->
          <span v-if="pageObj">{{(pageObj.currentPage - 1)*pageObj.size + scope.$index + 1}}</span>
          <!-- 无分页时，序号显示 -->
          <span v-else>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <slot v-if="col.slot" :name="col.slot"></slot>
        <!-- 普通列 -->
        <el-table-column
          v-else
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
      </template>
    </el-table>
    <!-- 是否调用分页 -->
    <div class="pagination">
      <el-pagination
        v-if="pageObj"
        background
        layout=" total,prev, pager, next, sizes, jumper"
        :pager-count="5"
        :page-sizes="pageObj.sizes"
        :page-size="pageObj.size"
        :total="pageObj.total"
        :current-page="pageObj.currentPage"
        @size-change="pageObj.sizeFunc"
        @current-change="pageObj.func"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataTable",
  props: {
    ButtonRight: {
      type: Array,
      default: () => [],
    },
    ButtonLeft: {
      type: Array,
      default: () => [],
    },
    //合并列表方法
    spanArr: {
      type: Array,
      default: () => [],
    },
    //需要合并行的第几列
    mergeColumns: {
      type: Number,
      default: () => 0,
    },
    //是否可勾选
    selection: {
      type: Boolean,
      default: () => true,
    },
    //列表数据
    tableData: {
      type: Array,
      default: () => [],
    },
    //表头
    columns: {
      type: Array,
      default: () => [],
    },
    //是否需要序号
    isShowIndex: {
      type: Boolean,
      default: () => false,
    },
    //加载
    loading: {
      type: Boolean,
      default: () => false,
    },
    //分页组件
    pageObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    //勾选的数据
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    //点击某一行返回行数据
    handleClick(val) {
      this.$emit("handleClick", val);
    },
    tableRowClassName({ row, rowIndex }) {
      //添加行序号
      row.index = rowIndex;
      //根据条件设置行的字体颜色
      // if (row.username == '1' ) {
      //   return "color1";
      // } else if (row.username == '2') {
      //   return "color2";
      // }
    },
    //合并行
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === this.mergeColumns) {
        const _row = this.spanArr[rowIndex]; //需要合并的行数
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>