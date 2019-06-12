<!--  -->
<template>
  <div class='h-cell-wrapper'>
    <div class="h-cell-tt ellipsis">
      <span>{{cellData.labelname || 多选}}</span>
      <span class="star"
            v-if="isStar">*</span>
    </div>
    <div class="h-cell-value tr"
         @click="clickOpen">
      <div class="placeholder box-b"
           :class="{'arrows':!isReadOnly}"
           v-if="valName">
        {{valName}}
      </div>
      <div class="placeholder arrows box-b placeholder-color"
           v-if="!valName && !isReadOnly">请选择</div>
    </div>
    <h-dialog-radio v-if="dialogShow"
                    :isDialogShow.sync="dialogShow"
                    :id="cellData.datatype"
                    :valueStr="val"
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
  import hDialogRadio from "@/components/components/h-dialog-checkbox.vue";
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
    value: any;
    val: string = "";
    valName: string = "";

    @Watch("value")
    onValueChange() {
      this.val = this.value;
    }

    /** 子组件选中值使用 */
    dialogShow = false;

    clickOpen() {
      if (!this.isReadOnly) {
        this.dialogShow = true;
      }
    }

    returnDialog(data) {
      let _nameStr = "",
        _idStr = "";
      data.forEach((element, index) => {
        if (index > 0) {
          _nameStr += ",";
          _idStr += ",";
        }
        _nameStr += element.name;
        _idStr += element.id;
      });
      this.val = _idStr;
      this.valName = _nameStr;
      this.$emit("change", this.val);
    }

    getName() {
      if (this.value) {
        let data = {
          type: "aadfwa",
          typeid: this.cellData.datatype,
          ids: this.value
        };
        getSelectedName(data).then(res => {
          let data: any = res.data;
          let name = "";
          if (data.length) {
            data.forEach((element, index) => {
              if (index) {
                name = name + "," + element.objname;
              } else {
                name = element.objname;
              }
            });
            this.valName = name;
          } else {
            this.$messagebox.confirm("数据获取失败,请返回重试");
          }
        });
      }
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
      flex: 1;
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