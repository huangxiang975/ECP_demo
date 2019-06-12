<!--  -->
<template>
  <div>
    <div class='h-cell-wrapper'
         @click.stop="clickOpen">
      <div class="h-cell-tt ellipsis">
        <span>{{cellData.formfield.labelname || 多选}}</span>
        <span class="star"
              v-if="isStar">*</span>
      </div>
      <div class="h-cell-value tr">
        <div class="placeholder box-b ellipsis"
             :class="{'arrows':!isReadOnly}"
             v-if="valName">
          {{valName}}
        </div>
        <div class="placeholder arrows box-b placeholder-color"
             v-if="!valName && !isReadOnly">请选择</div>
      </div>
    </div>
    <h-dialog-radio v-if="dialogShow"
                    :isDialogShow.sync="dialogShow"
                    :id="cellData.formfield.datatype"
                    @returnDialog="returnDialog"></h-dialog-radio>
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
  import hDialogRadio from "@/components/components/h-dialog-radio.vue";

  import { getSelectedName } from "@/api/sundry";
  import * as dd from "dingtalk-jsapi";
  @Component({
    components: {
      hDialogRadio
    }
  })
  export default class Page extends Vue {
    @Prop({ type: Object, required: true }) cellData: any;
    @Prop({ type: Boolean, default: false }) isReadOnly: boolean;
    @Prop({ type: Boolean, default: false }) isStar: boolean;

    @Model("change", { type: String })
    value: string;

    // val: string = this.value;
    valName: string = this.cellData.displayvalue || "";

    dialogShow = false;
    keyName = this.cellData.displayvalue;

    clickOpen() {
      this.dialogShow = this.isReadOnly ? false : true;
    }

    getName() {
      if (this.value) {
        let data = {
          type: "aadfwa",
          typeid: this.cellData.formfield.datatype,
          ids: this.value
        };
        getSelectedName(data).then(res => {
          let data: any = res.data;
          if (data.length) {
            this.valName = data[0].objname;
          } else {
            this.$messagebox.confirm("数据获取失败,请返回重试");
          }
        });
      }
    }

    returnDialog(data) {
      this.valName = data.name;
      this.$emit("change", data.id);
    }

    created() {
      this.getName();
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
      .h-cell-check-list {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.26rem;
        color: #fff;
        background-color: #a5d2ff;
        padding: 0 0.15rem;
        border-radius: 0.05rem;
        margin-right: 0.15rem;
      }
      .on-check-list {
        background-color: #3396fb;
      }

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