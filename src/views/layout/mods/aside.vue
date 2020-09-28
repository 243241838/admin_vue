<template>
  <div>
    <el-aside>
      <menu-nav />
    </el-aside>
  </div>
</template>
<script >
import menuNav from "./menu";
export default {
  name: "cAside",
  components: {
    menuNav
  },
  data: () => {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.el-aside {
  width: 200px !important;
  height: 100%;
  overflow-x: hidden;
  background: #17233d;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>
