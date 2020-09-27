import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import user from "./modules/user";
Vue.use(Vuex);
// 自动化导入模块
const modulesFiles = require.context("./modules", true, /\.js$/); // 读取文件的路径 是否遍历文件的子目录 匹配文件的正则
// require.context
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath
    .replace(/^\.\/(.*)\.\w+$/, "$1")
    .replace(/[-][a-z]/g, (v) => v.toUpperCase().substr(1));
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default
  return modules;
}, {});
export default new Vuex.Store({
  modules,
  state,
  getters,
  actions,
  mutations
});
