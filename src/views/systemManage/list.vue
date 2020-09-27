<template>
  <div class="app-container flex flex_column">
    <el-form :inline="true" :model="params" ref="search" class="demo-form-inline">
      <el-form-item label="审批人" prop="user">
        <el-input v-model="params.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="params.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button size="small" icon="el-icon-refresh-right" @click="resetForm('search')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button-group style="padding-bottom: 5px">
      <el-button @click="edit()" type="primary" size="small" icon="el-icon-plus">添加</el-button>
    </el-button-group>
    <el-table :data="tableData" v-loading="loading" border highlight-current-row stripe fit class="item_flex" height="100%">
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="date" label="日期" align="center" width="180" />
      <el-table-column prop="name" label="姓名" align="center" width="180" />
      <el-table-column prop="address" label="地址" align="center" />
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row, 1)" type="text" size="small">编辑</el-button>
          <el-button @click="deleData(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :page.sync="params.pageIndex" :size.sync="params.pageSize" :total="total" @getData="getList()" />
    <add :title="title" :form-data="formData" :dialog-visible.sync="dialogVisible" @callBack="getList()" />
  </div>
</template>

<script>
import { getList } from "@/api/systemManage/list.js";
import { add } from "./mods";
export default {
  components: {
    add
  },
  data() {
    return {
      loading: false,
      params: {
        pageIndex: 1,
        pageSize: this.GLOBAL.pageSize,
        user: "",
        region: ""
      },
      total: 100,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          id: 1,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          id: 2,
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          id: 3,
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          id: 4,
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      title: "",
      dialogVisible: false,
      formData: {
        name: "",
        address: ""
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
        this.params.pageIndex = 1;
      }
      getList(this.params)
        .then(res => {
          // 这里保证都是成功 200
          let data = res.data ? res.data : [];
          this.tableData = data.list ? data.list : [];
          this.total = data.total;
          this.loading = false;
        })
        .catch(err => {
          // 报错或者 后端提示不是200
          this.loading = false;
          console.log(err);
        });
    },
    // 编辑 查看 新增
    edit(row, status) {
      if (row) {
        this.title = "查看";
        if (status) {
          this.title = "编辑";
        }
        this.formData = JSON.parse(JSON.stringify(row));
      } else {
        this.title = "新增";
        this.formData = {
          name: "",
          address: ""
        };
      }
      this.dialogVisible = true;
    },
    // 删除
    deleData() {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.params.pageIndex = 1;
      this.params.pageSize = this.GLOBAL.pageSize;
      this.getList();
    }
  }
};
</script>
