<!--  -->
<template>
  <div class='head bgc-fff'>
    <div class="head-portrait">
      <div class="portrait-img fl  ov-h">
        <img src="@/assets/img/headPortrait.jpg"
             class="fl">
      </div>
      <div class="head-name">
        <div class="name">张晓琪</div>
        <div class="type">等待我审批</div>
      </div>
    </div>
    <div class="crux">
      <div class="list">
        <span class="tltle tr">审批编号:</span>
        <span class="value box-b">48498486564899/8987</span>
      </div>
      <div class="list">
        <span class="tltle tr">审批编号:</span>
        <span class="value box-b">48498486564899898748498486564899484984865649484984865648994849848656489948498486564899</span>
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
  .head {
    .head-portrait {
      height: 0.66rem;
      padding: 0.3rem;
      border: 1px solid #ededed;
      border-left: none;
      border-right: none;
      .portrait-img {
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 50%;
      }
      .head-name {
        margin-left: 0.86rem;
        .name {
          font-size: 0.3rem;
          color: #333;
          line-height: 0.4rem;
        }
        .type {
          font-size: 0.24rem;
          color: #f69245;
        }
      }
    }
    .crux {
      padding: 0.1rem 0.3rem;
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
</style>