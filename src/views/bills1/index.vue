<!-- 审批单详情 -->
<template>
  <div class='form-menu is-approver'>
    <head-box></head-box>
    <reimbursement-box></reimbursement-box>
    <img-box></img-box>
    <approver></approver>
    <bottom-btn></bottom-btn>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import headBox from "./components/head.vue";
  import imgBox from "./components/img.vue";
  import reimbursementBox from "./components/reimbursement.vue";
  import approver from "./components/approver.vue";
  import bottomBtn from "./components/bottom-btn.vue";
  import { getBillsDetails } from "@/api/bills";

  @Component({
    components: { headBox, imgBox, reimbursementBox, approver, bottomBtn }
  })
  export default class FormMenu extends Vue {
    loadData(id) {
      getBillsDetails(id).then(res => {
        let data: any = res.data;
        console.log(data);
      });
    }

    created() {
      this.loadData(this.$route.query.id);
    }
  }
</script>

<style lang='less' scoped>
  .is-approver {
    height: calc(100% - 1rem);
    overflow: auto;
  }
</style>