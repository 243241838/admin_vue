<template>
  <div id="app">
    <!-- <div class="box">
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
    </div> -->
    <el-container>
      <c-aside />
      <el-container style="flex-direction: column;">
        <c-head />
        <div class="main">
          <div class="tabs">
            <tabs />
          </div>
          <c-main />
        </div>
      </el-container>
    </el-container>

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
  height: 100vh
}
// .main {
//   width: calc(100vw - 200px);
// }
</style>
