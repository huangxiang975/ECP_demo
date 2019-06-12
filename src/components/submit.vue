<!-- 提交按钮 -->
<template>
  <div class='submit-box p-f tc bgc-fff'
       @click="returnCubmit">
    <div class="submit-btn tc">提交</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    @Prop({ type: String, default: "提交" })
    btnValue: string;

    returnCubmit() {
      this.$emit("returnCubmit");
    }
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
      color: #fff;
      background-color: #3396fb;
      border-radius: 0.1rem;
    }
  }
</style>