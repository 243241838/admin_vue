import Vue from "vue";
import utils from '@/utils/index'; //常用工具文件
import Pagination from '@/components/Pagination' // 分页
import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
Vue.prototype.$utils = utils;
Vue.component('Pagination', Pagination) // 全局注册分页组件
Vue.component('C-table', Table)
Vue.component('Dialog', Dialog)
let Global = {
    pageSize: 20,
    pageSizes: [20, 30, 50]
};
Object.defineProperty(Vue.prototype, "GLOBAL", { value: Global });