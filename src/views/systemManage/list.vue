<template>
  <div class="app-container flex flex_column">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="params.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="params.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from "@/api/systemManage/list.js";
// import {add} from './mods'
export default {
  components: {
    // add
  },
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: this.GLOBAL.pageSize,
        user: "",
        region: ""
      }
    };
  },
  created() {},
  mounted() {
    // this.getList();
  },
  methods: {
    getList(status) {
      if (status) {
        this.params.pageIndex = 1
      }
      getList(this.params)
        .then(res => {
          // 这里保证都是成功 200
          this.loading = false;
        })
        .catch(err => {
          // 报错或者 后端提示不是200
          this.loading = false;
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.params.pageIndex = 1;
      this.params.pageSize = this.GLOBAL.pageSize
      this.getList()
    }
  }
};
</script>
