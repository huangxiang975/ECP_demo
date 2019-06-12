<template>
  <div id="app"
       class="wh-100 ov-a">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
  @import "./style/base.less";
  @import "./style/color.less";
  @import "./style/common.less";
  @import "./style/font-color.less";
  html,
  body {
    width: 100%;
    height: 100%;
  }
  #app {
    background-color: #f6f6f6;
  }
</style>

<script>
  export default {};
</script>
