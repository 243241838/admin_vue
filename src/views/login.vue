<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  created() {
    this.$Cookies.remove("token");
    this.$store.dispatch("initVisitedView", []);
  },
  methods: {
    login() {
      this.$Cookies.set("token", "543");
      this.$router.push(
        {
          path: "/welcome"
        },
        () => {}
      ); // 动态路由 next({...to}) 所以这里要加一个回调，否则报错
    }
  }
};
</script>
