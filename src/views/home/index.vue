<!-- 首页 -->
<template>
  <div class='home-page wh-100 bgc-fff'>
    <div class="banner ov-h">
      <img src="@/assets/img/banner.svg">
    </div>
    <div class="btns">
      <router-link tag="div"
                   class="btn-list dp-ib tc"
                   v-for="(item,index) in btnData"
                   :key="index"
                   :to="item.router">
        <div class="btn-img p-r">
          <span class="btn-number p-b"
                v-if="item.isNumber">99</span>
          <img :src="item.iconUrl">
        </div>
        <p class="btn-name">{{item.name}}</p>
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import * as dd from "dingtalk-jsapi";
  @Component
  export default class HomePage extends Vue {
    btnData = [
      {
        router: "/bills-list?status=0",
        iconUrl: require("@/assets/img/backlog.svg"),
        name: "待办",
        isNumber: true
      },
      {
        router: "/bills-list?status=2",
        iconUrl: require("@/assets/img/finished.svg"),
        name: "已办",
        isNumber: false
      },
      {
        router: "/examine",
        iconUrl: require("@/assets/img/examine.svg"),
        name: "审批",
        isNumber: false
      }
    ];

    created() {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "首页"
        });
      });
    }
  }
</script>

<style lang='less' scoped>
  .banner {
    padding: 0.3rem 0.3rem 0;
    img {
      height: auto;
    }
  }
  .btns {
    .btn-list {
      width: 33%;
      .btn-img {
        width: 0.9rem;
        height: 0.9rem;
        margin: 0 auto;
        padding-top: 0.64rem;
        .btn-number {
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.3rem;
          top: 0.58rem;
          right: -0.08rem;
          border-radius: 50%;
          color: #fff;
          background-color: red;
          font-size: 0.2rem;
        }
      }
      .btn-name {
        padding-top: 0.28rem;
        font-size: 0.3rem;
        color: #333;
      }
    }
  }
</style>