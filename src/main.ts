import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import MintUI from "mint-ui";
Vue.use(MintUI);
import "mint-ui/lib/style.css"; // mint-ui样式

import "reset-css";
import "./utils/rem";

Vue.config.productionTip = false;

import "./utils/permission"; // 路由拦截器

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
