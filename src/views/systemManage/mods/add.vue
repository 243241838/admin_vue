<template>
  <div>
    <Dialog :title="title" :dialog-visible.sync="dialogVisible" :width="'30%'" :loading="loading" :isEdit="isEdit" @handleClose="handleClose" @submitForm="submitForm">
      <el-form ref="formName" :inline="false" :model="formData" :rules="rules" label-width="105px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入" :readonly="!isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input v-model="formData.address" placeholder="请输入" :readonly="!isEdit" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import { add } from "@/api/systemManage/list.js";

export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  computed: {
    isEdit() {
      return this.title !== "查看";
    }
  },
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["formName"].validate(valid => {
        if (valid) {
          this.loading = true;
          add(this.formData)
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.handleClose(); // 关闭弹窗 清除验证
              this.$emit("callBack"); // 刷新表格
              setTimeout(() => {
                this.loading = false;
              }, 1500);
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$refs["formName"].clearValidate();
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>
