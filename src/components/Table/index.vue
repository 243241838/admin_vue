<template>
  <el-table ref="tableList" :data="tableData" v-loading="loading" border highlight-current-row stripe fit @row-click="rowClick" @selection-change="handleSelectionChange" @sort-change="sortChange" :height="height">
    <!-- 复选框 -->
    <el-table-column v-if="multipleSelection" type="selection" align="center" width="55" />
    <!-- 序号 -->
    <el-table-column v-if="isIndex" label="序号" align="center" width="70">
      <template slot-scope="scope">
        {{ scope.$index+1 +  (pageParams.pageIndex == 1 ? 0 : (pageParams.pageIndex-1)*pageParams.pageSize)}}
      </template>
    </el-table-column>
    <template v-for="item in tableParams">
      <!-- 需要特殊过滤的 -->
      <template v-if="item.slotName">
        <slot :name="item.slotName"></slot>
      </template>
      <el-table-column v-else-if="item.type == 'index'" :key="item.label" :prop="item.params" :type="item.type" :label="item.label" align="center" :width="item.width">
        <template slot-scope="scope">
          {{ scope.$index+1 +  (pageParams.pageIndex == 1 ? 0 : (pageParams.pageIndex-1)*pageParams.pageSize)}}
        </template>
      </el-table-column>
      <!-- 没有排序的 -->
      <el-table-column v-else-if="!item.sortable" :key="item.label" :prop="item.params" :type="item.type" :label="item.label" align="center" :width="item.width" />
      <el-table-column v-else :key="item.label" :prop="item.params" :type="item.type" :label="item.label" sortable="custom" align="center" :width="item.width" />
    </template>
    <slot name="operation"></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    // tableParams 数据介绍
    // let tableParams = [
    //   {
    //     label: '',
    //     params: '', // selection | index 可为空或不传
    //     width: '', // 可选 不必传
    //     type: '',  // selection | index 可选 不必传
    //     sortable: '',  // true 或false 可选 不必传
    //     slotName: '' // 具名插槽 用于数据过滤 不必传
    //   }
    // ]
    tableParams: {
      type: Array,
      default: () => {
        return;
      }
    },
    tableData: {
      // 表格数据
      type: Array,
      default: () => {
        return [];
      }
    },
    // 分页参数
    pageParams: {
      type: Object,
      default: () => {
        return {
          pageIndex: 1,
          pageSize: this.GLOBAL.pageSize
        };
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ""
    },
    multipleSelection: {
      // 多选 可不传
      type: Array,
      default: () => []
    },
    isIndex: {
      // 默认显示 传false不显示
      type: Boolean,
      default: true
    },
    // 以下用不到， 父页面就不需要设置
    sort: {
      // 排序的方式
      type: String,
      default: ""
    },
    order: {
      // 排序的字段
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      // 多选赋值
      this.$emit("update:multipleSelection", val);
    },
    sortChange(value) {
      // 排序
      let sort = value.order === "ascending" ? "ASC" : "DESC";
      if (value.order) {
        this.$emit("update:sort", sort);
        this.$emit("update:order", value.prop);
      } else {
        this.$emit("update:sort", "");
        this.$emit("update:order", "");
      }
      this.$emit("callBack", 1); // 重新请求
    },
    rowClick(row, column, event) {
      this.$emit('rowClick', row)
    },
  }
};
</script>
<style lang="scss" scoped>
.content__footer {
  padding: 10px 0px;
  text-align: right;
}
</style>
