<!--  -->
<template>
  <div class='h-cell-wrapper'>
    <div class="h-cell-tt ellipsis">
      <span>{{cellData.formfield.labelname || 浮点数}}</span>
      <span class="star"
            v-if="isStar">*</span>
    </div>
    <div class="h-cell-value">
      <input type="text"
             class="tr"
             v-model="val"
             @input="inputNumber"
             @change="changeInput"
             :placeholder="isReadOnly?'':'请输入'"
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

    @Model("change", {})
    value: any;
    val: any = this.value || null;
    @Watch("value")
    onValueChange() {
      this.val = this.value;
    }

    inputNumber(e) {
      this.val = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
    }

    changeInput() {
      let isLegal = /-[1-9]\d*|[1-9]\d*/.test(this.val);
      if (!isLegal) {
        this.val = "";
      }
      this.$emit("change", this.val);
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