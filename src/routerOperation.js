import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import Cookies from "js-cookie";
import store from "./store";
const whiteList = ["/login"]; // no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  const temptoken = Cookies.get("token");
  if (temptoken && temptoken !== undefined && temptoken !== "undefined") {
    // 当是登录页面，不需要请求权限菜单
    if (to.path === "/login") {
      next();
      return;
    }
    // 判断是否有路由权限
    if (store.getters.routers && store.getters.routers.length == 0) {
      store
        .dispatch("getPermission")
        .then((routers) => {
          router.addRoutes(routers); // 动态添加可访问路由表
          router.addRoutes([{ path: "*", redirect: "/login" }]); // 当找不到时，跳转登录页面或者404
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 会重新进入beforeEach,set the replace: true so the navigation will not leave a history record
        })
        .catch((error) => {
          Cookies.remove("token");
          location.reload();
        });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
      return;
    }
    next("/login");
  }
  // NProgress.done()
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
