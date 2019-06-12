<!--  -->
<template>
  <div class='h-cell-wrapper'>
    <div class="h-cell-tt ellipsis">
      <span>{{cellData.formfield.labelname || 下拉筛选}}</span>
      <span class="star"
            v-if="isStar">*</span>
    </div>
    <div class="h-cell-value ellipsis tr"
         @click="clickSelect">
      <div class="placeholder box-b ellipsis"
           :class="{'arrows':!isReadOnly}"
           v-if="valName">
        {{valName}}
      </div>
      <div class="placeholder arrows box-b placeholder-color"
           v-if="!valName && !isReadOnly">请选择</div>
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
  import { getSelectData } from "@/api/cell";
  import { getSelectedName } from "@/api/sundry";
  import * as dd from "dingtalk-jsapi";
  @Component
  export default class Page extends Vue {
    @Prop({ type: Object, required: true }) cellData: any;
    @Prop({ type: Boolean, default: false }) isReadOnly: boolean;
    @Prop({ type: Boolean, default: false }) isStar: boolean;

    @Model("change", { type: String })
    value: string;

    selectData: any[];

    valName = this.cellData.displayvalue || "";

    loadData() {
      getSelectData(this.cellData.formfield.datatype).then(res => {
        let _data: any = res.data;
        let _arr = [];
        if (_data.result.length) {
          _data.result.forEach(element => {
            let _list = {
              key: element.typeName,
              value: element.id
            };
            _arr.push(_list);
          });
        }
        this.selectData = _arr;
      });
    }

    getName() {
      if (this.value) {
        let data = {
          type: "selected",
          typeid: this.cellData.formfield.datatype,
          ids: this.value
        };
        getSelectedName(data).then(res => {
          if (res.data.length) {
            this.valName = res.data[0].objname;
          }
        });
      }
    }

    clickSelect() {
      if (this.isReadOnly) {
        return false;
      }
      this.goSelect();
    }

    goSelect() {
      dd.ready(() => {
        dd.biz.util
          .chosen({
            source: this.selectData,
            selectedKey: this.valName // 默认选中的key
          })
          .then(res => {
            this.valName = res.key;
            this.$emit("change", res.value);
          });
      });
    }

    created() {
      this.loadData();
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