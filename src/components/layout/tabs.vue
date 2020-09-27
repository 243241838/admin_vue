<template>
  <div>

    <div class="tabs">
      <el-tabs v-model="editableTabsValue" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in visitedViews" :key="item.name" :label="item.title" :name="item.name">
          <span slot="label">{{item.title}}<i v-if="!item.isClose" @click.stop="close(item, index)" class="el-icon-circle-close close"></i></span>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script >
import { mapGetters } from "vuex";
export default {
  name: "tabs",
  data: () => {
    return {
      editableTabsValue: "home"
    };
  },
  watch: {
    $route: {
      handler: function() {
        this.editableTabsValue = this.$route.name;
        this.$store.dispatch("addView", this.$route);
      },
      immediate: true // 果为true 代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法 初始化就执行一次
    }
  },
  computed: {
    ...mapGetters(["visitedViews", "cachedViews"])
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      let index = tab.index;
      if (this.$route.path == this.visitedViews[index].path) {
        return false;
      }
      this.$router.push({
        path: this.visitedViews[index].path
      });
    },
    close(item, index) {
      this.$store.dispatch("delView", item).then(({ visitedViews }) => {
        if (this.isActive(item)) {
          const latestView = visitedViews.slice(-1)[0];
          if (latestView) {
            // 跳转最后一个
            this.$router.push({
              path: latestView.path
            });
          } else {
            // 当为空时
            this.$router.push("/welcome");
          }
        }
      });
    },
    // 判断当前
    isActive(item) {
      return item.path === this.$route.path;
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs {
  padding: 5px 10px 0 10px;
  margin-bottom: 2px;
  background: #fff;
  /deep/.el-tabs__header {
    margin: 0;
  }
  /deep/.el-tabs--card > .el-tabs__header {
    border-bottom: 0;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #f7f7f7;
    border-bottom: 0;
  }

  /deep/.el-tabs__item {
    border-bottom: 0;
    // padding: 0 10px!important;
  }
  .close {
    margin-left: 5px;
    padding: 5px;
  }
}
</style>
