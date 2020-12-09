import { getPermission } from "@/api/user";
import { asyncRouterMap } from "@/router";
import router from "../../router";
// 路由格式化处理

function formatRouter(routers, level = 1) {
  const array = routers.map((item) => {
    let data = {
      path: item.path,
      name: item.path.replace(/\//g, "") + parseInt(Math.random() * 100000),
      component: level == 1 ? () => import("@/views/" + item.component) : "",
      title: item.meta.title,
      icon: item.meta.icon,
      hidden: item.hidden,
      meta: {
        title: item.meta.title,
        component: item.component,
        icon: item.meta.icon,
        noCache: item.meta.noCache,
        isRegister: true, //是否需要注册
      },
      children:
        item.children && item.children.length && item.children.length > 0
          ? formatRouter(item.children, level + 1)
          : [],
    };
    if (level != 1) {
      delete data.component;
    }
    return data;
  });
  return array;
}
const user = {
  state: {
    userInfo: {}, // 用户资料
    routers: [], // 动态路由
    menus: [], // 菜单
    isGetRouters: false,
  },
  mutations: {
    // 设置菜单
    SETROUTERS: (state, { userInfo, routers, btnList }) => {
      state.userInfo = userInfo;
      state.userInfo = {
        name: "超级管理员",
      };
      state.isGetRouters = true
      state.routers = routers;
      state.menus = [...routers];
    },
  },
  actions: {
    getPermission({ commit }) {
      return new Promise((resolve, reject) => {
        // 获取菜单权限和按钮权限
        // getPermission()
        //   .then((res) => {
        //     const routers = formatRouter(res);
        //     commit("SETROUTERS",userInfo: {} routers);
        //     resolve(routers);
        //   })
        //   .catch((err) => {
        //     reject();
        //   });
        const routers = formatRouter(asyncRouterMap); // 过滤
        const btnList = ['user:query']
        commit("SETROUTERS", { userInfo: {}, routers, btnList }); // 本地调试
        resolve(routers);
      });
    },
  },
};
export default user;
