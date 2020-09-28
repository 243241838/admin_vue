<template>
  <div id="app">
    <el-container>
      <c-aside />
      <el-container style="flex-direction: column;">
        <c-head />
        <tabs />
        <c-main />
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
  height: 100vh;
}
</style>
