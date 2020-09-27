<template>
  <div>
    <el-header class="flex flex_align">
      <div class="logo flex justify_c">
        logo
      </div>
      <div class="item_flex right flex flex_right">
        <ul>
          <li @click="logOut">退出</li>
        </ul>
      </div>
    </el-header>
  </div>
</template>
<script >
export default {
  name: "cHead",
  data: () => {
    return {};
  },
  components: {},
  created() {},
  methods: {
    logOut () {
      this.$Cookies.remove('token')
      location.reload()
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #333;
  // padding: 0px;
  color: #fff;
}
.logo {
  width: 180px;
}
</style>
