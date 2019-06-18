<!-- 标签页 -->
<template>
  <div class='label bgc-fff'>
    <span class="label-list"
          v-for="(item,$index) in val"
          :key="$index">
      <span class="label-name"
            @click="clickLabel($index)">{{item.name}}</span>
      <span class="label-arrows tc"
            v-if="$index != val.length -1">></span>
    </span>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
  @Component
  export default class Page extends Vue {
    @Model("change", { type: Array }) value: any[];
    val: any[] = this.value;
    @Watch("value")
    onValueChange() {
      this.val = this.value;
    }

    clickLabel(i) {
      let _index = i + 1;
      if (_index === this.val.length) {
        return;
      }
      this.val.splice(_index, this.val.length - _index);
      this.$emit("change", this.val);
    }
  }
</script>

<style lang='less' scoped>
  .label {
    height: 0.6rem;
    padding: 0.1rem 0.3rem;
    margin-bottom: 0.2rem;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 0;
    .label-list {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0;
      color: #666;
      .label-name:last-of-type {
        color: #666;
      }
      .label-name {
        font-size: 0.26rem;
        color: #3396fb;
      }
      .label-arrows {
        font-size: 0.26rem;
        width: 2em;
      }
    }
  }
</style>