<template>
    <el-header class="flex flex_align">
      <div class="item_flex right flex flex_right">
        <ul>
          <li @click="logOut">退出</li>
        </ul>
      </div>
    </el-header>
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
  // width: 100%;
  background-color: #333;
  color: #fff;
}
</style>
