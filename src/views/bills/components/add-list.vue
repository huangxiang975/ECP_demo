<!-- 新增明细 -->
<template>
  <div class='add-list-page bgc-fff tc'
       @click="clickAddList">
    <span class="add-list-btn">新增明细</span>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Emit } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    @Emit("clickAddList")
    clickAddList() {}
  }
</script>

<style lang='less' scoped>
  .add-list-page {
    font-size: 0;
    border-top: 1px solid #ededed;
    .add-list-btn {
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.32rem;
      color: #3296fa;
      background: url("../../../assets/img/add-lis.svg") no-repeat left 0 top
        0.28rem;
      background-size: 0.32rem 0.32rem;
      padding-left: 0.6rem;
    }
  }
</style>