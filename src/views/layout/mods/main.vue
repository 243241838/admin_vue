<template>
  <el-main class="item_flex">
    <keep-alive :include="cachedViews">
      <!-- 将缓存name为test-keep-alive的组件 -->
      <!-- 已有路由 -->
      <router-view />
      <!-- 动态配置的 -->
      <components :is="componentName"></components>
    </keep-alive>
  </el-main>
</template>
<script >
import Vue from "vue";
import { mapGetters } from "vuex";
const _import = file => () =>
  import(/* webpackChunkName: `[request][index]` */ `@/views/${file}`); //动态设置chunkName打包
export default {
  name: "cMain",
  data: () => {
    return {
      componentName: ""
    };
  },
  computed: {
    ...mapGetters(["cachedViews"])
  },
  watch: {
    $route: {
      handler: function() {
        this.initPermission();
      },
      immediate: true // 果为true 代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法 初始化就执行一次
    }
  },
  components: {},
  created() {},
  methods: {
    initPermission() {
      //根据路由的路径配置出来的引入路径 user/home    二级路由就是user文件夹下home.vue    三级路由user/list/index 就是user文件夹下list文件夹下的index.vue
      // 也可以根据路由配置meta下的component配置路径
      let name = this.$route.name;
      if (!this.$route.meta.isRegister) {
        return;
      }
      if (this.hasComponent(name)) {
        this.componentName = name;
        return false;
      }
      let async = _import(this.$route.meta.component);
      async().then(
        com => {
          Vue.component(name, com.default);
          this.componentName = name;
        },
        errors => {
          this.componentName = Error;
          this.$message.error(
            "模块地址加载失败,地址：" +
              this.$route.path +
              "，具体错误：" +
              errors
          );
          console.error(errors);
        }
      );
    },
    // 判断有没有注册
    hasComponent(componentName) {
      return this.$root.$options.components[componentName];
    }
  }
};
</script>
<style lang="scss" scoped>
.el-main {
  background-color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>
