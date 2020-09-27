import Vue from 'vue'
import  '@/assets/css/index.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './routerOperation'
import * as filters from './filters'
import App from './App.vue'
import store from './store'
import router from './router'
import Cookies from "js-cookie";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$Cookies = Cookies
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
