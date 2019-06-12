<!-- 审批流程 -->
<template>
  <div class='examine-box bgc-fff'>
    <div class="title">审批流程</div>
    <div class="main">
      <div class="list p-r">
        <div class="position fr">直接主管</div>
        <div class="head-img p-b">
          <img class="fl"
               src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="content">
          <div class="name">罗真页</div>
          <div class="annotation">1个主管审批</div>
        </div>
      </div>
      <div class="list p-r">
        <div class="position fr">直接主管</div>
        <div class="head-img p-b">
          <img class="fl"
               src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="content">
          <div class="name">罗真页</div>
          <div class="annotation">1个主管审批</div>
        </div>
      </div>
      <div class="list p-r">
        <div class="position fr">直接主管</div>
        <div class="head-img p-b">
          <img class="fl"
               src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="content">
          <div class="name">罗真页</div>
          <div class="annotation">1个主管审批</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {}
</script>

<style lang='less' scoped>
  .examine-box {
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    .title {
      font-size: 0.32rem;
      color: #333;
      line-height: 1rem;
    }
    .main {
      padding: 0.4rem 0;
      .list {
        padding-left: 0.4rem;
        height: 1rem;
        padding-bottom: 0.46rem;
        .head-img {
          top: 0.17rem;
          width: 0.66rem;
          height: 0.66rem;
          border-radius: 50%;
        }
        .position {
          line-height: 1rem;
          font-size: 0.3rem;
          color: #333;
        }
        .content {
          margin-left: 0.9rem;
          .name {
            line-height: 0.6rem;
            font-size: 0.3rem;
            color: #333;
          }
          .annotation {
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
      .list::before {
        content: "";
        position: absolute;
        top: 0.4rem;
        left: 0;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        background-color: #d2d2d2;
      }
      .list::after {
        content: "";
        position: absolute;
        top: 0.5rem;
        left: 0.08rem;
        width: 0.04rem;
        height: 1.46rem;
        background-color: #d2d2d2;
      }
      .list:last-child::after {
        content: "";
        display: none;
      }
    }
  }
</style>