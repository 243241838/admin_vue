<template>
  <div id="app">
    <div class="box">
      <c-head />
      <el-container>
        <c-aside />
        <div class="main">
          <div class="tabs">
            <tabs />
          </div>

          <c-main />
        </div>
      </el-container>
      <!-- <el-container>
        <c-aside />
        <el-container>
          <c-head />
          <div class="tabs">
            <tabs />
          </div>
          <c-main />
        </el-container>
      </el-container> -->
    </div>

  </div>
</template>
<script >
import { tabs, cHead, cAside, cMain } from "./mods";
export default {
  name: "layout",
  components: {
    tabs,
    cHead,
    cAside,
    cMain
  },
  data: () => {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: calc(100vh - 60px);
}
.main {
  width: calc(100vw - 180px);
}
</style>
