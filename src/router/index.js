import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 自动化导入模块
const modulesFiles = require.context("./modules", true, /\.js$/); // 读取文件的路径 是否遍历文件的子目录 匹配文件的正则
// require.context
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath
    .replace(/^\.\/(.*)\.\w+$/, "$1")
    .replace(/[-][a-z]/g, (v) => v.toUpperCase().substr(1));
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    meta: {
      title: "登录",
      noCache: true
    },
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "",
    name: "",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("@/views/welcome"),
        meta: {
          title: "welcome"
        },
      },
    ],
  },
];
const router = new VueRouter({
  routes,
});

export default router;
export const asyncRouterMap = [...Object.values(modules)];
