<!-- 审批 -->
<template>
  <div class='examine'>
    <div class="tab-head bgc-fff">
      <router-link tag="div"
                   class="list dp-ib tc"
                   v-for="(item,index) in tabData"
                   :key="index"
                   :to="item.router">
        <div class="img dp-ib p-r">
          <span class="btn-number p-b box-b"
                v-if="item.isNumber && !!commissionNumber">{{commissionNumber}}</span>
          <img :src="item.iconUrl">
        </div>
        <p class="name">{{item.name}}</p>
      </router-link>
    </div>
    <div class="common bgc-fff">
      <div class="title">常用申请</div>
      <div class="content">
        <router-link tag="div"
                     class="app-list dp-ib tc box-b"
                     v-for="(item,index) in appData"
                     :key="index"
                     :to="'/newApprove?id=' + item.objid">
          <div class="img dp-ib">
            <img :src="appIcon[index]">
          </div>
          <p class="name">{{item.text}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import { getReceiptsList } from "@/api/bills";
  import { getAppLists } from "@/api/sundry";
  import * as dd from "dingtalk-jsapi";
  @Component
  export default class Examine extends Vue {
    tabData = [
      {
        router: "/bills-list?status=2",
        iconUrl: require("@/assets/img/my-examine.svg"),
        name: "我审批的"
      },
      {
        router: "/bills-list?status=1",
        iconUrl: require("@/assets/img/my-founding.svg"),
        name: "我发起的"
      },
      {
        router: "/bills-list?status=4",
        iconUrl: require("@/assets/img/my-copy.svg"),
        name: "抄送我的"
      },
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
      }
    ];

    appData = [];
    appIcon = [
      require("@/assets/img/app-icon1.svg"),
      require("@/assets/img/app-icon2.svg"),
      require("@/assets/img/app-icon3.svg"),
      require("@/assets/img/app-icon4.svg")
    ];

    commissionNumber: number = null;

    /** 待办数量获取 */
    loadBacklogNumber() {
      let data = {
        Page: 1,
        start: 1,
        limit: 25,
        status: 0
      };
      getReceiptsList(data).then(res => {
        this.commissionNumber = res.data.totalCount;
        if (this.commissionNumber > 99) {
          this.commissionNumber = 99;
        }
      });
    }

    /** 获取app列表 */
    getAppList() {
      getAppLists()
        .then(res => {
          let _data: any = res.data;
          this.appData = _data.items[0].items;
        })
        .catch(err => {});
    }

    created() {
      // dd.ready(() => {
      //   dd.biz.navigation.setTitle({
      //     title: "审批"
      //   });
      // });
      this.getAppList();
      this.loadBacklogNumber();
    }
  }
</script>

<style lang='less' scoped>
  .examine {
    .tab-head {
      .list {
        width: 33%;
        padding: 0.4rem 0;
        .img {
          width: 0.62rem;
          height: 0.62rem;
          margin: 0 auto;
          .btn-number {
            width: 0.3rem;
            height: 0.3rem;
            line-height: 0.3rem;
            top: 0.15rem;
            right: -0.08rem;
            border-radius: 50%;
            color: #fff;
            background-color: red;
            font-size: 0.2rem;
            border: 1px solid #fff;
          }
        }
        .name {
          padding-top: 0.2rem;
          font-size: 0.26rem;
          color: #a7a7a7;
        }
      }
    }
    .common {
      margin-top: 0.2rem;
      .title {
        font-size: 0.28rem;
        padding: 0.3rem;
        color: #333;
      }
      .content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .app-list {
          padding: 0.5rem 0;
          .img {
            width: 0.9rem;
            height: 0.9rem;
            margin: 0 auto;
            font-size: 0;
          }
          .name {
            padding: 0.28rem 0.3rem 0;
            font-size: 0.3rem;
            color: #333;
          }
        }
      }
    }
  }
</style>