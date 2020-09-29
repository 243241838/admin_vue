const user = {
  state: {
    visitedViews: [
      // tabs显示数据
      {
        path: "/welcome",
        name: "welcome",
        isClose: true,
        title: "welcome",
      },
    ],
    cachedViews: [], // 页面缓存
  },
  mutations: {
    INITVISITEDVIEW: (state, view) => {
      state.visitedViews = view;
    },
    // 添加显示数据
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some((v) => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
    // 添加缓存数据
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return; // 判断是否已缓存
      state.cachedViews.push(view.name);
    },
    // 删除显示数据
    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    // 删除缓存数据
    DEL_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
  },
  actions: {
    initVisitedView({ commit }, view) {
      commit("INITVISITEDVIEW", view);
    },
    addView({ dispatch }, view) {
      dispatch("addVisitedView", view);
      dispatch("addCachedView", view);
    },
    addVisitedView({ commit }, view) {
      commit("ADD_VISITED_VIEW", view);
    },
    addCachedView({ commit }, view) {
      commit("ADD_CACHED_VIEW", view);
    },
    delView({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delVisitedView", view);
        dispatch("delCachedView", view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delVisitedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_VISITED_VIEW", view);
        resolve([...state.visitedViews]);
      });
    },
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_CACHED_VIEW", view);
        resolve([...state.cachedViews]);
      });
    },
  },
};
export default user;
