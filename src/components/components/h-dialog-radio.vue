<!--  -->
<template>
  <div class='h-dialog p-f bgc-fff'>
    <h-search v-model="form.value"
              @change="changeSearch"></h-search>
    <div class="h-dialog-main ov-a">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="form.loading"
          infinite-scroll-distance="50">
        <li v-for="(item,index) in listsData"
            :key="index"
            class="list box-b bgc-fff ellipsis"
            :class="{'on-list':isOnClick(item)}"
            @click="clickList(item)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <h-button @ReturnType="ReturnType"></h-button>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
  import hSearch from "@/components/search.vue";
  import hButton from "@/components/h-button.vue";
  import * as dd from "dingtalk-jsapi";
  import { getBrowseData } from "@/api/cell";
  @Component({
    components: {
      hSearch,
      hButton
    }
  })
  export default class Page extends Vue {
    @Prop({ type: Boolean, default: false }) isDialogShow: boolean;
    @Prop({ type: String, default: "" }) id: string;

    listsData: any[] = [];

    form = {
      loading: false,
      value: "",
      id: this.id,
      Page: 0,
      start: 0,
      limit: 25
    };

    onData = {
      name: "",
      id: ""
    };

    @Watch("form.id")
    copyData() {
      this.onData.id = this.form.id;
      this.onData.name = this.form.value;
    }

    @Emit("returnDialog")
    returnDialog(data) {}

    @Emit("update:isDialogShow")
    returnShow(bl) {}

    /** 底部按钮返回事件 返回值 0.确定  1.返回 */
    ReturnType(data) {
      if (data === 0) {
        if (this.onData.id != "") {
          this.returnDialog(this.onData);
        } else {
          this.$messagebox.confirm("选择失败,未选择内容!");
        }
      }
      this.returnShow(false);
    }

    loadData() {
      getBrowseData(this.form).then(res => {
        let _data: any = res.data;
        if (_data.totalCount > 0) {
          this.listsData = [...this.listsData, ..._data.result];
          let maxNumber = _data.totalCount || -1;
          if (maxNumber > this.form.Page * this.form.limit) {
            this.form.loading = false;
          }
        } else {
          this.$toast("暂无数据!");
        }
      });
    }

    changeSearch() {
      this.form.Page = 1;
      this.form.loading = true;
      this.listsData = [];
      this.loadData();
    }

    isOnClick(item) {
      let isOn = false;
      if (this.onData.id != "") {
        isOn = this.onData.id == item.id;
      }
      return isOn;
    }

    clickList(i) {
      this.onData.id = i.id;
      this.onData.name = i.name;
    }

    loadMore() {
      this.form.Page++;
      this.form.loading = true;
      this.loadData();
    }
  }
</script>

<style lang='less' scoped>
  .h-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    .h-dialog-main {
      height: calc(100% - 1.7rem);
      .on-list {
        background-color: #ccc;
      }
      .list {
        height: 0.8rem;
        line-height: 0.8rem;
        color: #333;
        font-size: 0.32rem;
        padding: 0 0.3rem;
      }
      .list + .list {
        border-top: 1px solid #ededed;
      }
    }
  }
</style>