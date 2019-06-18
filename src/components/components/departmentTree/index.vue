<!-- 人员选择 -->
<template>
  <div class="personnel-page wh-100 ov-h p-b">
    <div class="personnel-main ov-h">
      <div class="lists-box wh-100">
        <h-label v-model="labelData"
                 @change="resetData"></h-label>
        <div class="lists-box ov-a">
          <ul v-infinite-scroll="loadMore"
              infinite-scroll-disabled="form.loading"
              infinite-scroll-distance="50">
            <li class="de-list"
                v-for="(item,index) in departmentData"
                :key="index">
              <department :listData="item"
                          :pitchOnData="pitchOnData"
                          @clickDepaitmen="clickDepaitmen"></department>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h-submit :pitchOnData="pitchOnData"
              @clickSubmit="clickSubmit"></h-submit>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop, Emit } from "vue-property-decorator";
  import hLabel from "./components/label.vue";
  import hSubmit from "./components/submit.vue";
  import department from "./components/department.vue";
  import * as dd from "dingtalk-jsapi";
  import { getdepartmentTree } from "@/api/cell";
  @Component({
    components: { hLabel, hSubmit, department }
  })
  export default class Personnel extends Vue {
    @Prop({ type: Boolean, required: true })
    isDialogShow: Boolean;

    @Prop({ type: String, default: "" })
    id: string;

    ladeMore: any = {
      loading: false,
      Page: 0,
      start: 0,
      limit: 25
    };
    /** 标签㛑 */
    labelData: any[] = [{ id: "", leafid: "0", name: "全部", processid: "" }];
    /** 部门数据 */
    departmentData = [];
    /** 选中数据 */
    pitchOnData: any = {};

    loadMore() {
      this.ladeMore.Page++;
      this.loadData();
    }

    resetData() {
      this.ladeMore.Page = 1;
      this.loadData();
    }

    loadData() {
      this.ladeMore.loading = true;
      let id = "";
      if (this.labelData.length > 0) {
        id = this.labelData[this.labelData.length - 1].processid;
      }
      getdepartmentTree(id).then(res => {
        let data = res.data;
        this.departmentData = data.result;
        let maxNumber = data.totalCount || -1;
        if (maxNumber > this.ladeMore.Page * this.ladeMore.limit) {
          this.ladeMore.loading = false;
        }
      });
    }

    /**部门按钮点击 */
    clickDepaitmen(data) {
      // 判断是否为叶子节点  是则继续请求下一层  不是则可保存
      if (data.leafid == "0") {
        this.labelData.push(data);
        this.pitchOnData = {};
        this.resetData();
      } else {
        this.pitchOnData = data;
      }
    }

    /**确定按钮点击事件 */
    clickSubmit(i) {
      if (i === 0) {
        if (this.pitchOnData.id) {
          this.ChangeShow(false);
          this.$emit("ReturnDepartmentTree", this.pitchOnData);
        } else {
          this.$messagebox.confirm("未选中任何部门!");
        }
      } else {
        this.ChangeShow(false);
      }
    }

    @Emit("update:isDialogShow")
    ChangeShow(isShow) {}
  }
</script>

<style lang='less' scoped>
  .personnel-page {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #f6f6f6;
    .personnel-main {
      height: calc(100% - 1rem);
      .lists-box {
        .lists-box {
          height: calc(100% - 1rem);
        }
        .de-list + .de-list {
          border-top: 1px solid #d9d9d9;
        }
      }
    }
  }
</style> 