<!-- 报销页面 -->
<template>
  <div class='new-approve-page wh-100 ov-h'>
    <main class="main ov-a">
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
        <h-add-list @clickAddList="clickAddList(list.slaveid)"></h-add-list>
      </div>
    </main>
    <h-submit @returnCubmit="returnCubmit"></h-submit>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import hCell from "@/components/h-cell/index.vue";
  import hCellHead from "@/components/h-cell-head/index.vue";
  import hExamine from "@/components/examine.vue";
  import hSubmit from "@/components/submit.vue";
  import hAddList from "./components/add-list.vue";
  import { getNewApprove, getSave } from "@/api/newApprove";
  import ecpUtils from "@/utils/ecpUtils";
  import * as dd from "dingtalk-jsapi";
  @Component({
    components: {
      hCell,
      hCellHead,
      hExamine,
      hSubmit,
      hAddList
    }
  })
  export default class Page extends Vue {
    routerQueryId: string | string[] = "";
    /** 页面配置数据 */
    pageData: any = {};

    /**  表单数据 */
    form: any = {
      maintable: {},
      detailtables: {}
    };

    /** 流程界面生成 */
    loadApproveData(id) {
      getNewApprove(id).then(res => {
        let _data: any = res.data;
        this.pageData = _data.result;
        this.getForm();
        dd.ready(() => {
          dd.biz.navigation.setTitle({
            title: this.pageData.objname
          });
        });
      });
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
      if (!!this.pageData.subtables) {
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

    /** 新增明细按钮点击 */
    clickAddList(slaveid) {
      let _data: any = {};
      for (let i in this.form.detailtables[slaveid][0]) {
        _data[i] = null;
      }
      let obj = { ...this.form.detailtables };
      obj[slaveid].push(_data);
      this.$set(this.form, "detailtables", obj);
    }

    /** 提交按钮点击事件 */
    returnCubmit() {
      // 表头必填项
      for (let i = 0; i < this.pageData.formfields.length; i++) {
        const element = this.pageData.formfields[i];
        if (element.displaymode === "3") {
          let _key = element.formfield.id;
          if (!this.form.maintable[_key]) {
            this.$toast(`${element.formfield.labelname}不能为空!`);
            return false;
          }
        }
      }

      getSave(this.form, this.pageData.dowid).then(res => {
        let data: any = res.data;
        if (data.success) {
          this.$toast("保存成功!");
          this.$router.replace("/bills-list?status=0");
        } else {
          this.$toast("保存失败,请检查内容!");
        }
      });
    }

    created() {
      if (this.$route.query.id) {
        this.loadApproveData(this.$route.query.id);
      } else {
        this.$toast("数据错误,请返回重试!");
      }
    }
  }
</script>

<style lang='less' scoped>
  .new-approve-page {
    .main {
      height: calc(100% - 1.8rem);
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