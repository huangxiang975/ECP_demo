<template>
  <div class="more-approver bgc-fff"
       v-if="moreShow">
    <div class="img-box ov-a  box-b">
      <div class="now-approver-imgbox ov-h fl"
           v-for="(item,index) in nowApprover"
           :key="index">
        <img src="@/assets/img/headPortrait.jpg"
             class="now-approver-img ov-h fl">
        <div class="name tc">{{item.username}}</div>
      </div>
    </div>
    <div class="button tc"
         @click="clickButton">确定</div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from "vue-property-decorator";
  import bottomBtn from "./bottom-btn.vue";
  @Component({
    components: {
      bottomBtn
    }
  })
  export default class moreApprover extends Vue {
    @Prop({ type: Array, default: [] })
    nowApprover: any[];
    @Prop({ type: Boolean, default: false })
    moreShow: Boolean;
    @Emit("update:moreShow")
    returnShow(i) {}

    clickButton() {
      this.returnShow(false);
    }
  }
</script>

<style scoped lang="less">
  .more-approver {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    .img-box {
      padding: 0.3rem;
      max-height: calc(100% - 1rem);
    }
    .now-approver-imgbox + .now-approver-imgbox {
      padding-left: 0.46rem;
    }
    .now-approver-imgbox {
      height: 1.16rem;
      .apostrophe-img {
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 50%;
        padding: 0.25rem 0;
      }
      .now-approver-img {
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 50%;
      }
      .name {
        font-size: 0.24rem;
        line-height: 0.5rem;
        color: #999;
      }
    }
    .button {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1rem;
      color: #79b7f6;
      background-color: #eee;
      line-height: 1rem;
      font-size: 0.34rem;
    }
  }
</style>