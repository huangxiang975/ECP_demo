import Vue from "vue";
import Router from "vue-router";
// import home from "@/views/home/index.vue";
import examine from "@/views/examine/index.vue";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: home
    // },
    // {
    //   path: "/examine", // 审批
    //   name: "examine",
    //   component: () => import("@/views/examine/index.vue")
    // },
    {
      path: "/",
      name: "examine",
      component: examine
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue")
    },
    {
      path: "/bills-list", // 单据列表
      name: "bills-list",
      component: () => import("@/views/billsList/index.vue")
    },

    {
      path: "/bills", // 审批表单详情
      name: "bills",
      component: () => import("@/views/bills/index.vue")
    },
    {
      path: "/newApprove", // 创建审批单据
      name: "newApprove",
      component: () => import("@/views/newApprove/index.vue")
    }
  ]
});
