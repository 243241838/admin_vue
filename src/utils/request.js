import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import Cookies from 'js-cookie';
// create an axios instance
const service = axios.create({
  baseURL: "", // api 的 base_url 如果只有一个网管，直接 process.env.VUE_APP_BASE_URL 多个网管， 在api里传进来
  timeout: 5000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers["token"] = Cookies.get('token');
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    const res = response.data;
    const code = res.code;
    // 失败
    if (code !== 200) {
      // 登录失效
      if (code === 10009) {
        Message({
          message: res.msg,
          type: "error",
          duration: 3500,
          onClose: function() {
            // 清除所有cookie
            Cookies.remove()
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          },
        });
        return Promise.reject(new Error("Error"));
      } else {
        // 提示报错
        Message({
          message: res.msg,
          type: "error",
          customClass: 'messageCustom',
          duration: 3500,
        });
        // code不是200返回 错误， 走catch
        return Promise.reject(new Error("Error"));
      }
    } else {
      return response.data;
    }
  },
  (error) => {
    Message({
      message: error.msg,
      type: "error",
      duration: 3500,
      onClose: function() {
        return Promise.reject(error);
      },
    });
  }
);

export default service;
