<template>
  <div class="menu">
    <el-menu :default-active="$route.path" :collapse="false" unique-opened class="el-menu-vertical-demo" background-color="#17233d" text-color="#fff" active-text-color="#ffd04b">
      <menu-sub v-for="item in menus" :key="item.name" :menuItem="item" :base-path="item.path" />
    </el-menu>
  </div>
</template>
<script >
import { mapGetters } from "vuex";
import menuSub from "./menuSub";
export default {
  name: "menuNav",
  components: {
    menuSub
  },
  data: () => {
    return {
      menu: [
        // 菜单格式
        {
          title: "首页",
          icon: "el-icon-menu",
          path: "/welcome",
          meta: {
            title: "首页",
            icon: "el-icon-menu"
          }
        },
        {
          title: "系统管理",
          icon: "el-icon-location",
          path: "/systemManage",
          meta: {
            title: "系统管理",
            icon: "el-icon-location"
          },
          children: [{ title: "list", path: "list" }]
        },
        {
          title: "用户",
          icon: "el-icon-menu",
          path: "/user",
          meta: {
            title: "用户",
            icon: "el-icon-menu"
          },
          children: [{ title: "home", path: "home" }]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["menus"])
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
/deep/.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
