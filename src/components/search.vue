<!-- 搜索框 -->
<template>
  <div class='search-box'>
    <input type="text"
           v-model="val"
           @input="$emit('change',val)"
           class="fl box-b"
           placeholder="搜索">
  </div>
</template>

<script lang='ts'>
  import {
    Component,
    Vue,
    Prop,
    Watch,
    Emit,
    Model
  } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    @Model("change", { type: String, default: "" })
    value: string;
    val: string = this.value;

    @Watch("value")
    onChangeValue() {
      this.val = this.value;
    }
  }
</script>

<style lang='less' scoped>
  .search-box {
    height: 0.7rem;
    padding: 0.25rem 0.3rem;
    input {
      width: 100%;
      height: 0.7rem;
      line-height: 0.7rem;
      padding-left: 0.62rem;
      border-radius: 0.1rem;
      font-size: 0.28rem;
      background: #ececec url("../assets/img/search.svg") no-repeat left 0.22rem
        top 0.2rem;
      background-size: 0.3rem 0.3rem;
      color: #666;
    }
    button {
      height: 0.7rem;
      line-height: 0.7rem;
      width: 1.1rem;
      i {
        width: 0.26rem;
        height: 0.26rem;
        background: #fff url("../assets/img/search-btn.svg") no-repeat;
        background-size: 100%;
      }
      span {
        font-size: 0.3rem;
        color: #b8b8b8;
      }
    }
  }
</style>