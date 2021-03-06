import Vue from "vue";
import VueRouter from "vue-router";
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
    path: '/redirect',
    component: () => import("@/views/layout"),
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import("@/views/redirect")
      }
    ]
  },
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
        path: "/home",
        name: "home",
        component: () => import("@/views/home"),
        meta: {
          title: "首页"
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
