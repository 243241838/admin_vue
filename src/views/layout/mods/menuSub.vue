<template>
  <div>
    <template v-if="menuItem.children && menuItem.children.length> 0">
      <el-submenu :index="menuItem.title">
        <template slot="title">
          <!-- {{ menuItem.title }} -->
          <i :class="menuItem.icon"></i>
          <span slot="title">{{menuItem.title}}</span>
        </template>
        <menu-sub v-for="item in menuItem.children" :key="item.menuName" :menuItem="item" :base-path="resolvePath(item.path)" />
      </el-submenu>

    </template>
    <template v-else>
      <el-menu-item :index="basePath" @click="go_url(menuItem.path)">
        <i :class="menuItem.icon"></i>
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
    }
  },
  data: () => {
    return {};
  },
  components: {},
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
<style lang="scss" scoped></style>
