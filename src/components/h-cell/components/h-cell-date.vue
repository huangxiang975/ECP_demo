<!-- 日期选择 -->
<template>
  <div class='h-cell-wrapper'
       @click.stop="clickDateShow">
    <div class="h-cell-tt ellipsis">
      <span>{{cellData.labelname || 日期选择}}</span>
      <span class="star"
            v-if="isStar">*</span>
    </div>
    <div class="h-cell-value ellipsis tr">
      <div class="placeholder box-b"
           :class="{'arrows':!isReadOnly}"
           v-if="value">
        {{value}}
      </div>
      <div class="placeholder arrows box-b placeholder-color"
           v-else-if="!value && !isReadOnly">请选择</div>
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
  import * as dd from "dingtalk-jsapi";
  @Component
  export default class Page extends Vue {
    $refs: {
      picker: any;
    };

    @Prop({ type: Object, required: true }) cellData: any;
    @Prop({ type: Boolean, default: false }) isReadOnly: boolean;
    @Prop({ type: Boolean, default: false }) isStar: boolean;
    @Model("change", { type: String }) value: any;
    created() {
      if (!this.value) {
        this.$emit("change", "");
      }
    }
    clickDateShow() {
      if (!this.isReadOnly) {
        dd.ready(() => {
          dd.biz.util
            .datepicker({
              format: "yyyy-MM-dd",
              value: this.value //默认显示时间  0.0.3
            })
            .then(res => {
              this.$emit("change", res.value);
            });
        });
      }
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
      flex: 1; max-width: 50%;
      line-height: 1rem;
      font-size: 0.32rem;
      color: #333;
    }
    .h-cell-value {
      .placeholder {
        font-size: 0.32rem;
        color: #333;
        padding-right: 0.4rem;
      }
      .arrows {
        background: url("../../../assets/img/arrows-right.svg") no-repeat top
          0.34rem right 0;
        background-size: 0.24rem 0.3rem;
      }
    }
  }
</style>