const user = {
  state: {
    visitedViews: [
      // tabs显示数据
      // {
      //   path: "/home",
      //   name: "home",
      //   isClose: true,
      //   title: "首页",
      // },
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
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
      // for (const i of state.cachedViews) {
      //   if (i === view.name) {
      //     const index = state.cachedViews.indexOf(i);
      //     state.cachedViews.splice(index, 1);
      //     break;
      //   }
      // }
    },
    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.path == '/home' || v.path === view.path
      })
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      const index = state.cachedViews.indexOf(view.name)
      if (index > -1) {
        let cachedViews = state.cachedViews.slice(index, index + 1)
        state.cachedViews = state.cachedViews.filter(v => {
          return v == 'home' || v == cachedViews[0]
        })
      } else {
        state.cachedViews = []
      }
    },
    DEL_ALL_VISITED_VIEWS: state => {
      const affixTags = state.visitedViews.filter(tag => tag.path == '/home')
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = ['home']
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
    delOthersViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delOthersVisitedViews', view)
        dispatch('delOthersCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },
    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },
  },
};
export default user;
