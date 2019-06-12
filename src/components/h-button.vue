<!-- 提交按钮 -->
<template>
  <div class='submit-box p-f tc bgc-fff'>
    <div class="back-btn"
         @click="clickBtn(1)">返回</div>
    <div class="submit-btn"
         @click="clickBtn(0)">确定</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Emit } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    @Emit("ReturnType")
    clickBtn(i) {}
  }
</script>

<style lang='less' scoped>
  .submit-box {
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.36rem;
    display: flex;
    .back-btn {
      flex: 1;
      color: #aaa;
      background-color: #eee;
    }
    .submit-btn {
      flex: 1;
      color: #fff;
      background-color: #3296fa;
    }
  }
</style>