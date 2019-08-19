<!-- 审批人员 -->
<template>
  <div class='approver bgc-fff'>
    <div class="approver-list p-r"
         v-for="(item, index) in pageData"
         :key="index">
      <div class="approver-img ov-h fl clearfloat">
        <img :src="item.touxiang"
             class="fl">
      </div>
      <div class="approver-main">
        <div class="list-head">
          {{item.objname}}({{item.objname2}})
          <span class="list-time fr">{{item.optdate+ " " + item.opttime}}</span>
        </div>
        <div class="list-user">{{item.objname1}}</div>
        <div class="list-opinion">{{item.optdesc}}</div>
      </div>
      <!-- <div class="time fr">{{item.optdate}}&nbsp;{{item.opttime}}</div>
      <div class="approver-content">
        <div class="type">{{item.objname}}({{item.objname2}})</div>
        <div class="name ellipsis">{{item.objname1}}</div>
      </div> -->
    </div>
    <div class="approver-list now-approver p-r"
         v-if="nowApprover.length > 0">
      <div class="now-approver-tt fr">{{nowApprover[0].nodename}}</div>
      <div class="now-approver-imgbox ov-h fl">
        <img :src="nowApprover[0].touxiang"
             class="now-approver-img ov-h fl">
        <div class="name ellipsis tc">{{nowApprover[0].username}}</div>
      </div>
      <div class="now-approver-imgbox ov-h fl"
           v-if="nowApprover.length > 1">
        <img :src="nowApprover[1].touxiang"
             class="now-approver-img ov-h fl">
        <div class="name ellipsis tc">{{nowApprover[1].username}}</div>
      </div>
      <div class="now-approver-imgbox ov-h fl"
           v-if="nowApprover.length > 2">
        <img :src="nowApprover[2].touxiang"
             class="now-approver-img ov-h fl">
        <div class="name ellipsis tc">{{nowApprover[2].username}}</div>
      </div>
      <div class="now-approver-imgbox ov-h fl"
           v-if="nowApprover.length > 3"
           @click="moreShow = true">
        <img src="@/assets/img/apostrophe.svg"
             class="now-approver-img ov-h fl">
      </div>
    </div>
    <more-approver :moreShow.sync="moreShow"
                   :nowApprover="nowApprover"></more-approver>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { getApprover } from "@/api/bills";
  import moreApprover from "./moreApprover.vue";

  @Component({
    components: {
      moreApprover
    }
  })
  export default class Approver extends Vue {
    @Prop({ type: String })
    processId: string;

    pageData: any[] = [];
    nowApprover: any[] = [];
    moreShow: boolean = false;

    loadData() {
      getApprover(this.processId)
        .then(res => {
          console.log(res);

          this.pageData = [...res.data.wflog];
          this.nowApprover = [...res.data.daiban];
        })
        .catch(err => {
          console.log(err);
        });
    }

    created() {
      this.loadData();
    }
  }
</script>

<style lang='less' scoped>
  .approver {
    padding: 0.4rem 0;
    margin: 0.2rem 0;
    .approver-list {
      padding: 0 0.3rem;
      min-height: 0.66rem;
      .approver-img {
        width: 0.66rem;
        height: 0.66rem;
        margin-right: -0.8rem;
        border-radius: 50%;
      }
      .approver-main {
        margin-left: 0.8rem;
        .list-head {
          height: 0.4rem;
          line-height: 0.4rem;
          vertical-align: bottom;
          font-size: 0.3rem;
          color: #333;
          .list-time {
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.22rem;
            color: #999;
          }
        }
        .list-user {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.24rem;
          color: #333;
        }
        .list-opinion {
          line-height: 0.3rem;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .now-approver {
      height: 1.16rem;
      .now-approver-tt {
        line-height: 1.16rem;
        font-size: 0.24rem;
        color: #333;
      }
      .now-approver-imgbox + .now-approver-imgbox {
        padding-left: 0.46rem;
      }
      .now-approver-imgbox {
        width: 0.66rem;
        height: 1.16rem;
        .apostrophe-img {
          width: 0.66rem;
          height: 0.66rem;
          border-radius: 50%;
          padding: 0.25rem 0;
        }
        .now-approver-img {
          width: 0.66rem;
          height: 0.66rem;
          border-radius: 50%;
        }
        .name {
          width: 0.66rem;
          height: 0.5rem;
          font-size: 0.24rem;
          line-height: 0.5rem;
          color: #999;
        }
      }
    }
    .approver-list {
      padding-bottom: 0.8rem;
    }
    .approver-list::after {
      content: "";
      position: absolute;
      top: 0.66rem;
      left: 0.6rem;
      width: 0.04rem;
      height: calc(100% - 0.8rem);
      background-color: #e5e5e5;
    }
    .approver-list:last-of-type {
      top: 0;
      padding-bottom: 0;
    }
    .approver-list:last-of-type::after {
      content: "";
      display: none;
    }
  }
</style>