<template>
  <div class="search_input">
    <el-form
      :size="size"
      inline
      :model="searchData"
      :rules="rules"
      ref="searchForm"
      :label-width="labelWidth"
      v-enterJump
    >
      <el-form-item
        v-for="item in searchForm"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
      >
        <!-- 输入框 -->
        <el-input
          clearable
          v-if="item.type === 'Input'"
          v-model="searchData[item.prop]"
          @input="item.input && item.input(searchData[item.prop])"
          :placeholder="item.placeholder"
        ></el-input>

        <!-- 密码框 -->
        <el-input
          v-if="item.type === 'password'"
          disabled
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
          auto-complete="off"
        >
          <template slot="append">
            <span @click="item.onClick">{{ item.name }}</span>
          </template>
        </el-input>

        <!-- 下拉框 -->
        <!-- $forceUpdate() 下拉刷新,修复数据改变下拉框不变的bug -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="searchData[item.prop]"
          @change="item.change && item.change(searchData[item.prop])"
          @visible-change="$forceUpdate()"
          :name="item.prop"
          :ref="item.prop"
        >
          <el-option
            v-for="op in item.options"
            :label="op.label"
            :value="op.value"
            :key="op.value"
          >{{ op.label }}</el-option>
        </el-select>

        <!-- 单选 -->
        <el-radio-group v-if="item.type === 'Radio'" v-model="searchData[item.prop]">
          <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ ra.label }}</el-radio>
        </el-radio-group>

        <!-- 组合单选按钮 -->
        <el-radio-group
          v-if="item.type === 'RadioButton'"
          v-model="searchData[item.prop]"
          @change="item.change && item.change(searchData[item.prop])"
        >
          <el-radio-button
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
          >{{ ra.label }}</el-radio-button>
        </el-radio-group>

        <!-- 复选框 -->
        <el-checkbox-group v-if="item.type === 'Checkbox'" v-model="searchData[item.prop]">
          <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ ch.label }}</el-checkbox>
        </el-checkbox-group>

        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'Date'"
          v-model="searchData[item.prop]"
          value-format="yyyy-MM-dd"
          @change="item.change && item.change(searchData[item.prop])"
          :placeholder="item.placeholder"
        ></el-date-picker>

        <!-- 时间 -->
        <el-time-select v-if="item.type === 'Time'" v-model="searchData[item.prop]"></el-time-select>

        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type === 'DateTime'"
          type="datetime"
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
          value-format="yyyy-MM-dd hh:mm:ss"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          @change="item.change && item.change(searchData[item.prop])"
        ></el-date-picker>

        <!-- 起止时间 -->
        <el-date-picker
          v-if="item.type === 'Daterange'"
          v-model="searchData[item.prop]"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="item.change && item.change(searchData[item.prop])"
        ></el-date-picker>

        <!-- 滑块 -->
        <el-slider v-if="item.type === 'Slider'" v-model="searchData[item.prop]"></el-slider>

        <!-- 开关 -->
        <el-switch v-if="item.type === 'Switch'" v-model="searchData[item.prop]"></el-switch>

        <!-- 三级联动 cascader -->
        <el-cascader
          v-if="item.type === 'cascader'"
          :options="item.props.options"
          v-model="searchData[item.prop]"
          :placeholder="item.props.placeholder || '请选择'"
          :disabled="item.props.disabled || false"
          style="width: 100%;"
          :props="item.props.defaultParams"
          @change="item.change && item.change(searchData[item.prop], item)"
        ></el-cascader>
      </el-form-item>
      <el-form-item class="search_input_button" v-if="isHandle">
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="search('重置')">
          重置
        </el-button>
      </el-form-item>
      <!-- button 操作按钮 -->
      <el-form-item class="search_input_button" v-if="searchHandle.length">
        <template v-for="item in searchHandle">
          <el-button :key="item.label" :type="item.type" @click="item.handle()" v-if="!item.hide">
            <span>{{ item.label }}</span>
          </el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "120px",
    },
    size: {
      type: String,
      default: "small",
    },
    searchForm: {
      type: Array,
      default: () => [],
    },
    searchHandle: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // 解析表单的正则验证
    rules() {
      let rules = this.searchForm.reduce((map, i) => {
        if (i.rules) {
          map[i.prop] = i.rules;
        }
        return map;
      }, {});
      return rules;
    },
  },
  methods:{
    search(type){
      if(type === '重置'){
        this.$refs.searchForm.resetFields()
      }
      let obj = {}
      Object.keys(this.$refs.searchForm.model).forEach(key =>{
        let item = this.$refs.searchForm.model[key]
        item ? obj[key] = item : obj[key] = null
      })
      this.$emit('search',obj)
    },
  }
};
</script>
<style lang="scss" scope>
</style>