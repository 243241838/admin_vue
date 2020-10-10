import Vue from "vue";

import Pagination from '@/components/Pagination' // 分页
import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
Vue.component('Pagination', Pagination) // 全局注册分页组件
Vue.component('C-table', Table)
Vue.component('Dialog', Dialog)
let Global = {
    pageSize: 20,
    pageSizes: [20, 30, 50]
};
Object.defineProperty(Vue.prototype, "GLOBAL", { value: Global });