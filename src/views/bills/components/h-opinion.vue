<!--  -->
<template>
  <div class='opinion-box p-f bgc-fff'
       v-show="opinionShow">
    <div class="opinion-main box-b">
      <textarea class="opinion-text wh-100"
                v-model="value"
                placeholder="请提供审批意见(非必填)"></textarea>
    </div>
    <h-submit :isConsent="isConsent"
              @returnCubmit="returnCubmit"></h-submit>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
  import hSubmit from "./opinion-btn.vue";
  @Component({
    components: {
      hSubmit
    }
  })
  export default class Page extends Vue {
    @Prop({ type: Boolean, default: true })
    isConsent: boolean;

    @Prop({ type: Boolean, default: true })
    opinionShow: boolean;

    @Emit("returnOpinion")
    returnOpinion(data) {}

    @Watch("opinionShow")
    changeShow() {
      this.value = "";
    }
    value = "";

    returnCubmit() {
      this.returnOpinion(this.value);
    }
  }
</script>

<style lang='less' scoped>
  .opinion-box {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .opinion-main {
      height: calc(100% - 1.8rem);
      padding: 0.3rem;
      .opinion-text {
        font-size: 0.32rem;
        color: #666;
        line-height: 0.6rem;
      }
    }
  }
</style>