<!-- 审批人员 -->
<template>
  <div class='approver bgc-fff'>
    <div class="approver-list p-r">
      <div class="approver-img ov-h fl">
        <img src="@/assets/img/headPortrait.jpg"
             class="fl">
      </div>
      <div class="time fr">2019-05-05 15:30</div>
      <div class="approver-content">
        <div class="type">发起申请</div>
        <div class="name">张晓琪</div>
      </div>
    </div>
    <div class="approver-list p-r">
      <div class="approver-img ov-h fl">
        <img src="@/assets/img/headPortrait.jpg"
             class="fl">
      </div>
      <div class="time fr">2019-05-05 15:30</div>
      <div class="approver-content">
        <div class="already-approver">罗真页(已同意)</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  @Component
  export default class Approver extends Vue {}
</script>

<style lang='less' scoped>
  .approver {
    padding: 0.4rem 0;
    margin: 0.2rem 0;
    .approver-list {
      padding: 0 0.3rem;
      height: 0.66rem;
      .approver-img {
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 50%;
      }
      .approver-content {
        height: 100%;
        .type {
          line-height: 0.4rem;
          font-size: 0.3rem;
          color: #333;
        }
        .name {
          font-size: 0.24rem;
          color: #999;
        }
        .already-approver {
          line-height: 0.66rem;
          font-size: 0.24rem;
          color: #999;
        }
      }
      .time {
        font-size: 0.22rem;
        color: #999;
      }
    }
    .approver-list::after {
      content: "";
      position: absolute;
      top: 0.72rem;
      left: 0.6rem;
      width: 0.04rem;
      height: 0.72rem;
      background-color: #e5e5e5;
    }
    .approver-list:last-of-type::after {
      content: "";
      display: none;
    }
    .approver-list + .approver-list {
      padding-top: 0.82rem;
    }
  }
</style>