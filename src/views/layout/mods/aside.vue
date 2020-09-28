<template>
  <el-aside class="flex flex_column" :class="{'isCollapse': isCollapse}">
    <div class="logo flex flex_align justify_c"><img src="~@/assets/images/logo.png" alt=""></div>
    <menu-nav class="menu item_flex" />
  </el-aside>
</template>
<script >
import { mapGetters } from "vuex";
import menuNav from "./menu";
export default {
  name: "cAside",
  components: {
    menuNav
  },
  data: () => {
    return {};
  },
   computed: {
    ...mapGetters(['isCollapse'])
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.el-aside {
  .logo {
    width: 100;
    height: 60px;
    img {
       width: 80%;
       height: 80%;
    }
  }
  width: 200px !important;
  height: 100%;
  overflow-x: hidden;
  background: #17233d;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &.isCollapse {
     width: 64px !important;
  }
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.menu {
  overflow-y: auto;
  /*滚动条整体部分,必须要设置*/

  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: transparent;
  }

  /*滚动条的轨道*/

  &::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
}
</style>
