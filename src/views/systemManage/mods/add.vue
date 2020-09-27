<template>
  <div>
    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="ruleForm" :inline="false" :model="formData" :rules="rules" label-width="105px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-select v-model="formData.address" placeholder="请选择" clearable>
                <el-input v-model="formData.address" placeholder="请输入"></el-input>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" submitForm('ruleForm')>确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
// import { getList } from "@/api/systemManage/list.js";
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
      loading: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     this.loading = true;
        
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    handleClose() {
      this.$refs["ruleForm"].clearValidate();
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>
