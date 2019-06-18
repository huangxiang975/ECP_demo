<!-- 部门 -->
<template>
  <div class='h-cell bgc-fff'>
    <div class="department-list"
         :class="{'arrows':listData.leafid == '0','is-pitch-on':pitchOnData.id == listData.id }"
         @click="clickDepaitmen">
      {{listData.name}}
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop } from "vue-property-decorator";
  // import { Mutation, Action, State, Getter } from "vuex-class";
  @Component
  export default class Department extends Vue {
    @Prop({ type: Object })
    listData: any;

    @Prop({ type: Object })
    pitchOnData: any;

    clickDepaitmen() {
      this.$emit("clickDepaitmen", this.listData);
    }
  }
</script>

<style lang='less' scoped>
  .h-cell + .h-cell {
    border-top: 1px solid #d9d9d9;
  }
  .is-pitch-on {
    background-color: #aaa;
  }
  .department-list,
  .personnel-list {
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
    color: #666;
  }
  .arrows {
    background: url("../../../../assets/img/arrows-right.svg") no-repeat top
      0.35rem right 0.3rem;
    background-size: 0.3rem;
  }
  .personnel-list {
    .list-check {
      width: 0.4rem;
      height: 0.4rem;
      transform: translate(0, 0.3rem);
    }
    .list-main {
      padding-left: 0.22rem;
      .name {
        line-height: 1rem;
      }
    }
  }
</style>