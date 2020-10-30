<template>
  <div v-show="total / size > 0" class="content__footer">
    <el-pagination :current-page="page" :page-sizes="GLOBAL.pageSizes" :page-size="size" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
export default {
  props: {
    page: {
      default: 1,
      type: Number
    },
    total: {
      default: 0,
      type: Number
    },
    size: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.$emit('update:size', val) // 赋值size
      this.$emit('update:page', 1) // 分页置为1
      this.$emit('getData')
    },
    handleCurrentChange(val) {
      this.$emit('update:page', val) // 赋值size
      this.$emit('getData')
    }
  }
}
</script>
<style lang="scss" scoped>
.content__footer{
    padding: 10px 0px;
    text-align: right;
}
</style>
