// 请求拦截器
import axios from "axios";
import { MessageBox } from "mint-ui";
import router from "@/router/index";
import store from "@/store/index";

// create an axios instance
const service = axios.create({
  // baseURL: "http://47.110.250.181:8082/",
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 50 * 1000
  // headers: {
  //   "x-superzone-req-platform": "Dingding"
  // }
});

// 请求前拦截器
service.interceptors.request.use(
  config => {
    // 如果身份 token 存在的话，那就直接加入 token 到 headers 中
    if (sessionStorage.getItem("token")) {
      config.params = {
        ...config.params,
        ecptoken: sessionStorage.getItem("token")
      };
      // config.headers["x-superzone-token"] = store.getters.getToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 请求返回后拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  res => {
    if (res.status !== 200) {
      if (res.statusText) {
        MessageBox(`错误原因`, `${res.statusText}`);
      } else {
      MessageBox(`错误原因`, `无返回值!`);
      }
      return Promise.reject("error");
    }
    return res;
  },
  error => {
    if (error) {
      MessageBox(`错误原因`, `${error}`);
    } else {
    MessageBox(`错误原因`, `无返回值!`);
    }
    return Promise.reject(error);
  }
);

export default service;
