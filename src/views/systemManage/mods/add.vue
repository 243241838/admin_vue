<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :before-close="handleClose">
      <el-form ref="ruleForm" :inline="false" :model="formData" :rules="rules" label-width="105px" class="demo-ruleForm">
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
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button v-if="isEdit" :loading="loading" type="primary" size="small" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          add(this.params)
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.$refs["ruleForm"].clearValidate();
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>
