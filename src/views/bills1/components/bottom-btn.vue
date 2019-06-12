<!-- 底部定位 -->
<template>
  <div class='botton-btn p-f'>
    <div class="btn-refuse tc">拒绝</div>
    <div class="btn-consent tc">同意</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  @Component
  export default class BottomBtn extends Vue {}
</script>

<style lang='less' scoped>
  .botton-btn {
    bottom: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    .btn-refuse,
    .btn-consent {
      flex: 1;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.34rem;
    }
    .btn-refuse {
      color: #79b7f6;
      background-color: #eee;
    }
    .btn-consent {
      color: #fff;
      background-color: #3399fb;
    }
  }
</style>