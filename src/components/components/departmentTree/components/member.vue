<!-- 部门 -->
<template>
  <div class='h-cell bgc-fff'>
    <div class="personnel-list"
         @click="clickCheckbox">
      <div class="list-check fl">
        <img class="fl"
             src="@/img/on-checkbox.svg"
             v-if="checkboxShow">
        <img class="fl"
             src="@/img/checkbox.svg"
             v-else>
      </div>
      <div class="list-main dp-ib">
        <div class="name">{{listData.OBJNAME}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop } from "vue-property-decorator";
  // import { Mutation, Action, State, Getter } from "vuex-class";
  @Component
  export default class Member extends Vue {
    @Prop()
    listData: any;

    @Prop()
    personnelData: any;

    clickCheckbox() {
      let _returnIndex = -1;
      if (this.personnelData.length) {
        _returnIndex = this.personnelData.findIndex(value => {
          return value.ID == this.listData.ID;
        });
      }
      if (_returnIndex >= 0) {
        this.personnelData.splice(_returnIndex, 1);
      } else {
        this.personnelData.push(this.listData);
      }
    }

    get checkboxShow() {
      if (this.personnelData.length) {
        return this.personnelData.some((value, index) => {
          return value.ID == this.listData.ID;
        });
      } else {
        return false;
      }
    }
  }
</script>

<style lang='less' scoped>
  .h-cell + .h-cell {
    border-top: 1px solid #d9d9d9;
  }
  .department-list,
  .personnel-list {
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
    color: #666;
  }
  .department-list {
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