<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  created() {
    this.init();
    this.beforLoad();
  },
  methods: {
    init() {
      let visitedViews = Cookies.get("visitedViews");
      Cookies.remove("visitedViews");
      if (!visitedViews) return;
      visitedViews = JSON.parse(visitedViews);
      this.$store.dispatch("initVisitedView", visitedViews);
    },
    beforLoad() {
      let that = this;
      window.onbeforeunload = function(e) {
          // 页面刷新
          let array = that.$store.state.tagsView.visitedViews || [];
          if (array.length > 0) {
            Cookies.set("visitedViews", JSON.stringify(array));
          }
      };
    }
  }
};
</script>
<style lang="scss">
</style>
