<!-- 照片部分组件 -->
<template>
  <div class='img-box'>
    <div class="tt">发票拍摄照片,财务需要核对</div>
    <div class="content bgc-fff">
      <span class="tltle tr">照片:</span>
      <div class="img-main box-b">
        <div class="img-list dp-ib">
          <img src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="img-list dp-ib">
          <img src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="img-list dp-ib">
          <img src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="img-list dp-ib">
          <img src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="img-list dp-ib">
          <img src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="img-list dp-ib">
          <img src="@/assets/img/headPortrait.jpg">
        </div>
        <div class="img-list dp-ib">
          <img src="@/assets/img/headPortrait.jpg">
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
  .img-box {
    .tt {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.26rem;
      color: #333;
      padding: 0 0.3rem;
    }
    .content {
      display: flex;
      align-items: flex-start;
      padding: 0.3rem;
      .tltle {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.28rem;
        width: 5em;
        color: #999;
      }
      .img-main {
        padding-left: 0.2rem;
        .img-list {
          width: 0.9rem;
          height: 0.9rem;
          margin: 0 0.2rem 0.2rem 0;
        }
      }
    }
  }
</style>