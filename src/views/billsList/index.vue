<!-- 已办审批 待办审批页面 -->
<template>
  <div class='backlog wh-100 bgc-fff'>
    <!-- <search-box></search-box> -->
    <!-- <div class="tab">
      <div class="tab-list">
        <div class="tab-content box-b tc"
             :class="{'on-tab':tabType===0}"
             @click="clickTab(0)">审批已办(10)</div>
      </div>
      <div class="tab-list">
        <div class="tab-content box-b tc"
             :class="{'on-tab':tabType===1}"
             @click="clickTab(1)">流程已办</div>
      </div>
    </div> -->
    <div class="main ov-a">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="form.loading"
          infinite-scroll-distance="50">
        <router-link tag="li"
                     class="list"
                     v-for="(item,index) in listData"
                     :key="index"
                     :to="{path:'/bills',
                     query:{
                       id:item.processid
                     }}">
          <div class="list-img ov-hv fl">
            <img :src="item.touxiang || `${urlIp}\\${item.touxiang1}`"
                 class="fl">
          </div>
          <div class="list-content">
            <div class="list-tt ellipsis">{{item.mobiletitle}}</div>
            <div class="list-time ellipsis">{{item.createdate}}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>

</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import searchBox from "@/components/search.vue";
  import { getReceiptsList } from "@/api/bills";
  import * as dd from "dingtalk-jsapi";
  @Component({
    components: { searchBox }
  })
  export default class PageBackLog extends Vue {
    tabType = 0;
    listData = [];
    form = {
      loading: false,
      Page: 0,
      start: 1,
      limit: 25,
      status: 0 // 0.待办  1.我发送的  2.已办  3.流程已完成  4.抄送我的
    };

    urlIp = window.location.origin;

    loadList() {
      this.$indicator.open("加载中...");
      this.form.loading = true;
      getReceiptsList(this.form)
        .then(res => {
          this.$indicator.close();
          let _data: any = res.data;
          this.listData = [...this.listData, ..._data.result];
          if (this.listData.length === 0) {
            this.$toast("暂无数据!");
          }
          // 验证是否有下一页
          let maxNumber = _data.totalCount || -1;
          if (maxNumber > this.form.Page * this.form.limit) {
            this.form.loading = false;
          }
        })
        .catch(err => {
          this.$indicator.close();
        });
    }

    loadMore() {
      this.form.Page++;
      this.form.loading = true;
      this.loadList();
    }

    // setTitle() {
    //   let title = "";
    //   switch (this.$route.query.status) {
    //     case "0":
    //       title = "待办";
    //       break;

    //     case "1":
    //       title = "我发起的";
    //       break;

    //     case "2":
    //       title = "我审批的";
    //       break;

    //     case "4":
    //       title = "抄送我的";
    //       break;

    //     default:
    //       break;
    //   }
    //   dd.ready(() => {
    //     dd.biz.navigation.setTitle({
    //       title: title
    //     });
    //   });
    // }

    created() {
      this.form.status = Number(this.$route.query.status) || 0;
    }
  }
</script>

<style lang='less' scoped>
  .backlog {
    .tab {
      display: flex;
      height: 0.9rem;
      .tab-list {
        flex: 1;
        .tab-content {
          width: 2rem;
          height: 0.9rem;
          line-height: 0.9rem;
          margin: 0 auto;
          font-size: 0.28rem;
          color: #999;
        }
        .on-tab {
          color: #3296fa;
          border-bottom: 0.05rem solid #3296fa;
        }
      }
    }
    .main {
      // height: calc(100% - 1.2rem);
      height: 100%;
      .list {
        padding: 0 0.3rem;
        height: 1.6rem;
        border-top: 1px solid #f6f6f6;
        background: url("../../assets/img/arrows-right.svg") no-repeat top 0.66rem
          right 0.3rem;
        background-size: 0.28rem 0.28rem;
        .list-img {
          width: 0.66rem;
          height: 0.66rem;
          border-radius: 50%;
          margin: 0.36rem 0.24rem 0 0;
          border-radius: 50%;
          overflow: hidden;
        }
        .list-content {
          margin: 0 1rem;
          height: 1.6rem;
          .list-tt {
            font-size: 0.3rem;
            color: #333;
            padding: 0.42rem 0 0.28rem;
          }
          .list-time {
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
    }
  }
</style>