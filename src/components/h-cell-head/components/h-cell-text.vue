<!--  -->
<template>
  <div class='h-cell-wrapper'>
    <div class="h-cell-tt ellipsis">
      <span>{{cellData.formfield.labelname || 标题文字}}</span>
    </div>
    <div class="h-cell-value ellipsis tr">{{value}}</div>
  </div>
</template>

<script lang='ts'>
  import {
    Component,
    Vue,
    Prop,
    Emit,
    Model,
    Watch
  } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    @Prop({ type: Object, required: true })
    cellData: any;

    @Model("change", { type: String })
    value: string;
  }
</script>

<style lang='less' scoped>
  .h-cell-wrapper {
    display: flex;
    font-size: 0;
    .star {
      font-size: 0.32rem;
    }
    .h-cell-tt,
    .h-cell-value {
      flex: 1;
      line-height: 1rem;
      font-size: 0.32rem;
      color: #333;
    }
  }
</style>