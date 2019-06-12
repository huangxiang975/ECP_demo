<!-- 提交按钮 -->
<template>
  <div class='submit-box p-f tc bgc-fff'
       @click="returnCubmit">
    <div class="submit-btn tc"
         :class="isConsent?'btn-consent':'btn-refuse'">{{isConsent?"确认同意":"确认拒绝"}}</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop, Emit } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    @Prop({ type: Boolean, default: true })
    isConsent: boolean;

    @Emit("returnCubmit")
    returnCubmit() {}
  }
</script>

<style lang='less' scoped>
  .submit-box {
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.8rem;
    .submit-btn {
      width: calc(100% - 0.6rem);
      height: 1rem;
      line-height: 1rem;
      margin: 0.4rem auto;
      font-size: 0.36rem;
      border-radius: 0.1rem;
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