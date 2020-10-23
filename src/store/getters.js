import state from "./state";

const getters = {
  userInfo: (state) => state.user.userInfo,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  routers: state => state.user.routers,
  menus: state => state.user.menus,
  isCollapse: state=> state.isCollapse,
  isGetRouters: state => state.user.isGetRouters
};
export default getters;
