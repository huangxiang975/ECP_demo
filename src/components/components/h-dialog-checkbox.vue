<!--  -->
<template>
  <div class='h-dialog p-f bgc-fff'>
    <h-search v-model="form.value"
              @input="inputSearch"></h-search>
    <div class="h-dialog-main ov-a">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="form.loading"
          infinite-scroll-distance="50">
        <li v-for="(item,index) in listsData"
            :key="index"
            class="list box-b bgc-fff ellipsis"
            @click="clickList(item.id)">
          <div class="img-fl fl">
            <img src="../../assets/img/on-checkbox.svg"
                 v-if="isOnCheck(item.id)">
            <img src="../../assets/img/checkbox.svg"
                 v-else>
          </div>
          <div class="list-value">
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <h-button @ReturnType="ReturnType"></h-button>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop, Emit } from "vue-property-decorator";
  import hSearch from "@/components/search.vue";
  import hButton from "@/components/h-button.vue";

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
    @Prop({ type: String, default: "" }) valueStr: string;

    form = {
      loading: false,
      value: "",
      id: this.id,
      Page: 0,
      start: 0,
      limit: 25
    };
    listsData = [];
    onCheckbox = [];

    @Emit("returnDialog")
    returnDialog(data) {}

    @Emit("update:isDialogShow")
    returnShow(bl) {}

    created() {
      this.onCheckbox = this.valueStr.split(",");
    }

    /** 底部按钮返回事件 返回值 0.确定  1.返回 */
    ReturnType(data) {
      if (data === 0) {
        if (this.onCheckbox.length) {
          let _arr = [];
          this.onCheckbox.forEach(element => {
            let _index = this.listsData.findIndex(list => {
              return list.id == element;
            });
            if (_index >= 0) {
              _arr.push(this.listsData[_index]);
            }
          });
          this.returnDialog(_arr);
        } else {
          this.$messagebox.confirm("选择失败,未选择内容!");
        }
      }
      this.returnShow(false);
    }

    loadData() {
      getBrowseData(this.form).then(res => {
        let _data: any = res.data;
        if (_data) {
          this.listsData = [...this.listsData, ..._data.result];
          let maxNumber = _data.totalCount || -1;
          if (maxNumber > this.form.Page * this.form.limit) {
            this.form.loading = false;
          }
        }
      });
    }

    clickList(id) {
      if (this.onCheckbox.length) {
        let _index = this.onCheckbox.findIndex(list => {
          return list == id;
        });
        _index < 0 ? this.onCheckbox.push(id) : this.onCheckbox.splice(_index, 1);
      } else {
        this.onCheckbox.push(id);
      }
    }

    inputSearch() {
      this.form.Page = 1;
      this.form.loading = true;
      this.loadData();
    }

    isOnCheck(id) {
      let _isOn = false;
      _isOn = this.onCheckbox.some(list => {
        return list == id;
      });
      return _isOn;
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
    z-index: 99999;
    .h-dialog-main {
      height: calc(100% - 1.7rem);
      .on-list {
        background-color: #ccc;
      }
      .list {
        height: 0.8rem;
        line-height: 0.8rem;
        color: #333;
        font-size: 0;
        padding: 0 0.3rem;
        .img-fl {
          width: 0.4rem;
          height: 0.4rem;
          padding: 0.2rem;
        }
        .list-value {
          font-size: 0.32rem;
        }
      }
      .list + .list {
        border-top: 1px solid #ededed;
      }
    }
  }
</style>