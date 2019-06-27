<!--  -->
<template>
  <div class='h-cell-wrapper'>
    <div class="h-cell-tt ellipsis">
      <span>{{cellData.labelname || 标题文字}}</span>
      <span class="star"
            v-if="isStar">*</span>
    </div>
    <div class="h-cell-value">
      <input type="text"
             class="tr"
             :placeholder="isReadOnly?'':'请输入'"
             @change="$emit('change',val)"
             v-model="val"
             :readonly="isReadOnly">
    </div>
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
    @Prop({ type: Object, required: true }) cellData: any;
    @Prop({ type: Boolean, default: false }) isReadOnly: boolean;
    @Prop({ type: Boolean, default: false }) isStar: boolean;

    @Model("change", { type: String })
    value: any;
    val: any = this.value;

    @Watch("value")
    onValueChange() {
      this.val = this.value;
    }
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
      max-width: 50%;
      line-height: 1rem;
      font-size: 0.32rem;
      color: #333;
    }
    .h-cell-value {
      input {
        width: 100%;
        height: 100%;
        font-size: 0.32rem;
      }
    }
  }
</style>