<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :close-on-click-modal="false" :before-close="handleClose" append-to-body>
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button v-if="isEdit" :loading="loading" type="primary" size="small" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$emit('submitForm')
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
};
</script>
<style lang="scss" scoped>
.content__footer {
  padding: 10px 0px;
  text-align: right;
}
</style>
