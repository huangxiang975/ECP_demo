<!-- 报销页面 -->
<template>
  <div class='new-approve-page wh-100 ov-h'>
    <main class="main ov-a"
          :class="{'main-is-btn':isBtnBoxShow}">
      <div class="form-head">
        <h-cell-head v-for="(item,index) in pageData.formfields"
                     :key="index"
                     @change="onChangeHead"
                     v-model="form.maintable[item.formfield.id]"
                     :cellData="item"></h-cell-head>
      </div>
      <div class="form-details"
           v-for="(list,index) in pageData.subtables"
           :key="index">
        <div v-for="(data,_index) in form.detailtables[list.slaveid]"
             :key="_index">
          <div class="details-title">{{ list.slaveformname + (_index + 1)}}</div>
          <div class="details-box">
            <h-cell v-for="(item,i) in list.detailfields"
                    :key="i"
                    v-model="data[item.id]"
                    @change="changeFormBody(list.slaveid,_index)"
                    :cellData.sync="item"></h-cell>
          </div>
        </div>
      </div>
      <approver :processId="processId"></approver>
    </main>
    <bottom-btn v-show="isBtnBoxShow"
                :isCancelShow="isCancelShow"
                :isSubmitShow="isSubmitShow"
                @returnBtn="returnBtn"></bottom-btn>
    <h-opinion :opinionShow="opinionData.show"
               :isConsent="opinionData.isConsent"
               @returnOpinion="returnOpinion"></h-opinion>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import hCell from "@/components/h-cell/index.vue";
  import hCellHead from "@/components/h-cell-head/index.vue";
  import hExamine from "@/components/examine.vue";
  import ecpUtils from "@/utils/ecpUtils";
  import approver from "./components/approver.vue";
  import bottomBtn from "./components/bottom-btn.vue";
  import hOpinion from "./components/h-opinion.vue";

  import * as dd from "dingtalk-jsapi";
  import { getBillsDetails, getBack, getSubmit } from "@/api/bills";
  @Component({
    components: {
      hCell,
      hCellHead,
      hExamine,
      approver,
      bottomBtn,
      hOpinion
    }
  })
  export default class Page extends Vue {
    processId: string | string[] = "";
    /** 页面配置数据 */
    pageData: any = {};

    /**  表单数据 */
    form: any = {
      deleted: null,
      maintable: {},
      detailtables: {}
    };
    /** 接口返回值 */
    detailsData: any = {};
    /** 意见弹窗数据 */
    opinionData: any = {
      show: false,
      isConsent: false,
      value: ""
    };

    /** 获取数据  复制值 */
    loadBillsData(id) {
      getBillsDetails(id).then(res => {
        let data: any = res.data;
        this.detailsData = data;
        dd.ready(() => {
          dd.biz.navigation.setTitle({
            title: data.result.objname
          });
        });
        this.form.deleted = data.deleted;
        this.$set(this.form, "maintable", data.result.mapmaintable);
        this.$set(this.form, "detailtables", data.result.detailtables);
        this.$set(this.pageData, "formfields", data.result.formfields);
        this.$set(this.pageData, "subtables", data.result.subtables);
      });
    }

    /** 底部按钮点击返回事件  i 0为确定  1为取消 */
    returnBtn(i) {
      if (i == 0) {
        this.opinionData.isConsent = true;
      } else {
        this.opinionData.isConsent = false;
      }
      this.opinionData.value = "";
      this.opinionData.show = true;
    }

    /** 填写意见弹窗返回值 */
    returnOpinion(data) {
      this.opinionData.show = false;
      this.opinionData.value = data;
      if (this.opinionData.isConsent) {
        this.getSubmit();
      } else {
        this.getBack();
      }
    }

    getSubmit() {
      let params = {
        processid: this.processId, //当前退回的流程主键
        remark: this.opinionData.value, //当前退回的审批意见
        datas: this.form
      };
      getSubmit(params).then(res => {
        if (res.data == 1) {
          this.$toast("已同意该单据!");
          this.loadBillsData(this.processId);
        } else {
          this.$toast("保存失败");
        }
      });
    }

    getBack() {
      let params = {
        processid: this.processId, //当前退回的流程主键
        remark: this.opinionData.value, //当前退回的审批意见
        rejecttonode: this.detailsData.rejecttonode.id, //当前退回的节点
        datas: this.form
      }; //当前提交流程参数信息};
      getBack(params).then(res => {
        if (res.data == 1) {
          this.$toast("已拒绝该单据!");
          this.loadBillsData(this.processId);
        } else {
          this.$toast("保存失败");
        }
      });
    }

    get isCancelShow() {
      let bl = false;
      if (this.detailsData.rejectable) {
        bl = true;
      }
      return bl;
    }

    get isSubmitShow() {
      let bl = false;
      if (this.detailsData.optlevel == 2) {
        bl = true;
      }
      return bl;
    }

    get isBtnBoxShow() {
      let bl = false;
      if (this.isCancelShow || this.isSubmitShow) {
        bl = true;
      }
      return bl;
    }

    /** 将获取的视图数据装换为需提交的绑定值得数据结构 */
    getForm() {
      const headObj: any = {};
      //表头部分
      this.pageData.formfields.forEach(element => {
        // 判断是否是下拉或浏览框等样式,是的话将会出现id值  此时displayvalue为展示内容 id为数据绑定值  {key:'',name:''}
        let _isSelect = [5, 6].some(list => {
          return list === element.formfield.displaytype;
        });
        if (_isSelect) {
          headObj[element.formfield.id] = element.id;
        } else {
          headObj[element.formfield.id] = element.displayvalue;
        }
        //  判断是否存在计算公式 使用正则获取前面的方法名和需计算的id
        if (!!element.formula) {
          // 正则是否合法
          let _isExist = /^([a-zA-Z_]\w*)\('\$([a-zA-Z_]\w*)\$'\)$/.test(
            element.formula
          );
          if (_isExist) {
            const [
              ,
              funName,
              arg
            ] = /^([a-zA-Z_]\w*)\('\$([a-zA-Z_]\w*)\$'\)$/.exec(element.formula);
            // 判断是否存在这个计算属性
            if (ecpUtils[funName]) {
              const getReturn = () => {
                if (!!this.form) {
                  //  调用方法并传参
                  return ecpUtils[funName](this.form, arg);
                } else {
                  return null;
                }
              };
              Object.defineProperty(headObj, element.formfield.id, {
                get: getReturn
              });
            }
          }
        }
      });
      // 使用set触发试图刷新  避免值变动了视图未刷新
      this.$set(this.form, "maintable", headObj);
      // 表体数据  数组类型  可能有多条明细
      this.pageData.subtables.forEach(item => {
        const arr = [];
        let data: any = {};
        // 获取单条数据的id设置为key  添加绑定值 (表体数据无初始值,将自己设置)
        item.detailfields.forEach(element => {
          data[element.id] = null;
        });
        arr.push(data);
        this.$set(this.form.detailtables, item.slaveid, arr);
      });
    }

    /** 表头值变动触发chagne事件 */
    onChangeHead() {
      let obj = { ...this.form.maintable };
      this.$set(this.form, "maintable", obj);
    }

    /** 表体值变动触发chagne事件 */
    changeFormBody(slaveid, index) {
      let obj = { ...this.form.detailtables[slaveid][index] };
      this.$set(this.form.detailtables[slaveid], index, obj);
    }

    created() {
      this.processId = this.$route.query.id;
      if (this.processId) {
        this.loadBillsData(this.processId);
      } else {
        this.$toast("数据错误,请返回重试!");
      }
    }
  }
</script>

<style lang='less' scoped>
  .new-approve-page {
    .main-is-btn {
      height: calc(100% - 1rem) !important;
    }
    .main {
      height: 100%;
      .form-details {
        .details-title {
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.26rem;
          padding: 0 0.3rem;
        }
      }
    }
  }
</style>