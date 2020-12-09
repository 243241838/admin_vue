<template>
  <div>
    <template v-if="menuItem.children && menuItem.children.length> 0">
      <el-submenu :index="menuItem.path">
        <template slot="title">
          <i :class="'el-icon-' + menuItem.icon"></i>
          <span slot="title">{{menuItem.title}}</span>
        </template>
        <menu-sub v-for="item in menuItem.children" :key="item.menuName" :menuItem="item" :base-path="resolvePath(item.path)" />
      </el-submenu>

    </template>
    <template v-else>
      <el-menu-item :index="basePath" @click="go_url(menuItem.path)">
        <i :class="'el-icon-' + menuItem.icon"></i>
        <span slot="title">{{menuItem.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script >
import path from "path";
export default {
  name: "menuSub",
  props: {
    menuItem: {
      type: Object,
      default: () => {
        return {};
      }
    },
    basePath: {
      type: String,
      default: ""
    },
    activeName: {
      type: String,
      default: ""
    },
    tier: {
      type: Number,
      default: 1
    }
  },
  data: () => {
    return {};
  },
  components: {},
  computed: {
    paddingLef() {
      return `padding-left:${(this.tier - 1) * 25}px`;
    }
  },
  created() {},
  methods: {
    go_url(url) {
      if (this.$route.path === this.basePath) {
        return;
      }
      this.$router.push({
        path: this.basePath
      });
    },
    resolvePath(url) {
      return path.resolve(this.basePath, url);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu-item {
  background: #21242d !important;
  border-left: 5px solid transparent;
}
.el-menu-item:hover {
  border-left: 5px solid #429cf0;
}

.is-active {
  background: #429cf0 !important;
  color: #fff !important;
}
/deep/ .el-submenu__title {
  padding-left: 15px !important;
  border-left: 5px solid transparent;
}
/deep/ .el-submenu__title:hover {
  border-left: 5px solid #429cf0;
  background: #313541 !important;
}
/deep/ .is-opened .icon {
  color: #fff !important;
}
/deep/ .is-opened > .el-submenu__title {
  color: #fff !important;
}
.icon {
  margin-right: 10px;
}
/deep/.el-submenu .el-submenu__title {
  background: #21242d !important;
}
.paddingLeft {
  padding-left: 15px !important;
}
</style>
