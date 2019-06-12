<!--  -->
<template>
  <div class='h-cell-wrapper'>
    <div class="h-cell-tt ellipsis">
      <span>{{cellData.formfield.labelname || 是否选中}}</span>
      <span class="star"
            v-if="isStar">*</span>
    </div>
    <div class="h-cell-value">
      <div class="h-cell-value-switch fr">
        <img src="@/assets/img/on-switch.svg"
             class="switch-img"
             @click="clickSwitch(0)"
             v-if="value == 1">
        <img src="@/assets/img/switch.svg"
             class="switch-img"
             @click="clickSwitch(1)"
             v-else>
      </div>
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
  import login from "../../../views/login/index.vue";
  @Component
  export default class Page extends Vue {
    @Prop({ type: Object, required: true }) cellData: any;
    @Prop({ type: Boolean, default: false }) isReadOnly: boolean;
    @Prop({ type: Boolean, default: false }) isStar: boolean;

    @Model("change", { type: String })
    value: string;

    clickSwitch(i) {
      this.$emit("change", i);
    }
  }
</script>

<style lang='less' scoped>
  .h-cell-wrapper {
    display: flex;
    font-size: 0;
    .h-cell-tt,
    .h-cell-value {
      flex: 1; max-width: 50%;
      line-height: 1rem;
      font-size: 0.32rem;
      color: #333;
    }
    .h-cell-value {
      font-size: 0;
      .h-cell-value-switch {
        width: 1.2rem;
        height: 0.6rem;
        padding: 0.2rem 0;
      }
      input {
        width: 100%;
        height: 100%;
        font-size: 0.32rem;
      }
    }
  }
</style>