<template>
  <div class="tabs" @click="closeMenu">
    <el-tabs v-model="editableTabsValue" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in visitedViews" :key="item.name" :label="item.title" :name="item.path">
        <span @contextmenu.prevent="openMenu(item,$event)" class="item_label" slot="label">{{item.title}}<i v-if="!item.isClose" @click.stop="close(item, index)" class="el-icon-circle-close close"></i></span>
      </el-tab-pane>
    </el-tabs>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新页面</li>
      <li v-if="isActive(selectedTag) && $route.path != '/home'" @click="close(selectedTag)">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>
<script >
import { mapGetters } from "vuex";
export default {
  name: "tabs",
  data: () => {
    return {
      editableTabsValue: "home",
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    };
  },
  watch: {
    $route: {
      handler: function() {
        let data = this.$route;
        this.editableTabsValue = data.path;
        let isRedirect = data.path.indexOf("/redirec");
        // 是重置的不在添加tabs
        if (isRedirect != -1) {
          return false;
        }
        this.$store.dispatch("addView", {
          name: data.name,
          path: data.path,
          meta: data.meta
        });
      }
      // immediate: true // 果为true 代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法 初始化就执行一次
    }
  },
  computed: {
    ...mapGetters(["visitedViews", "cachedViews"])
  },
  created() {
    // 默认
    this.editableTabsValue = this.$route.path;
    let data = this.$route;
    this.$store.dispatch("addView", {
      name: data.name,
      path: data.path,
      isClose: true,
      meta: data.meta
    });
  },
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
    },
    // 打开
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY - 88;
      //   this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    // 刷新页面
    refreshSelectedTag(view) {
      this.$store.dispatch("delCachedView", view).then(cached => {
        this.$nextTick(() => {
          this.$router.replace(
            {
              path: "/redirect" + view.path
            },
            () => {}
          );
        });
      });
    },
    // 关闭其他
    closeOthersTags() {
      this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
        this.$router.push({
          path: "/redirect" + this.selectedTag.path
        });
      });
    },
    // 关闭所有
    closeAllTags(view) {
      this.$store.dispatch("delAllViews").then(({ visitedViews }) => {
        this.$router.push({
          path: "/home"
        });
      });
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs {
  padding: 5px 10px 0 10px;
  margin-bottom: 2px;
  background: #fff;
  position: relative;
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
  .item_label {
    padding: 0 20px;
    display: inline-block;
    line-height: 40px;
  }
  .close {
    margin-left: 5px;
    padding: 5px;
  }
}
/deep/.el-tabs__item {
  padding: 0 !important;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
