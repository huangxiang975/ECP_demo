<!-- 报销明细 -->
<template>
  <div class='reimbursement'>
    <div class="reimbursement-list"
         v-for="(item, index) in data"
         :key="index">
      <div class="title">报销明细({{index+1}})</div>
      <div class="content bgc-fff">
        <div class="list">
          <span class="tltle tr">审批编号:</span>
          <span class="value box-b">48498486564899/8987</span>
        </div>
        <div class="list">
          <span class="tltle tr">审批编号:</span>
          <span class="value box-b">48498486564899/8987</span>
        </div>
        <div class="list">
          <span class="tltle tr">审批编号:</span>
          <span class="value box-b">48498486564899/8987</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    data = [{}, {}];
  }
</script>

<style lang='less' scoped>
  .reimbursement {
    .reimbursement-list {
      .title {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.26rem;
        color: #333;
        padding: 0 0.3rem;
      }
      .content {
        .list {
          font-size: 0.28rem;
          padding: 0.1rem 0;
          display: flex;
          align-items: flex-start;
          .tltle {
            line-height: 0.5rem;
            width: 5em;
            color: #999;
          }
          .value {
            line-height: 0.5rem;
            width: calc(100% - 5em);
            word-break: break-all;
            padding-left: 0.2rem;
          }
        }
      }
    }
  }
</style>