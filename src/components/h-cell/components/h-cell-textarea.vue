<!--  -->
<template>
  <div class='h-cell-wrapper h-cell-wrapper-textarea'>
    <div class="h-cell-textarea-tt ellipsis">
      <span>{{cellData.labelname || 多行文本输入}}</span>
      <span class="star"
            v-if="isStar">*</span>
    </div>
    <div class="h-cell-textarea">
      <textarea v-model="val"
                @change="$emit('change',val)"
                :placeholder="isReadOnly?'':'请输入'"
                :readonly="isReadOnly"></textarea>
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
    value: string;
    val: any = this.value;

    @Watch("value")
    onValueChange() {
      this.val = this.value;
    }
  }
</script>

<style lang='less' scoped>
  .star {
    font-size: 0.32rem;
  }
  .h-cell-textarea-tt {
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #333;
    display: block;
  }
  .h-cell-textarea {
    height: 1.6rem;
    color: #666;
    padding-bottom: 0.2rem;
    textarea {
      width: 100%;
      height: 100%;
      line-height: 0.4rem;
      font-size: 0.32rem;
      word-wrap: break-word;
    }
  }
</style>