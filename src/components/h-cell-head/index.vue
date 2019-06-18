<!--单元格 -->
<template>
  <div class='h-cell bgc-fff box-b ov-h'
       v-if="isShow">
    <!-- 0.单行展示文本  1.单行文本输入框  2.多行文本输入框  3.整数  4.浮点数  5.日期  6.时间  7下拉  8.单选-->
    <h-cell-text v-if="type == 0"
                 :cellData="cellData"></h-cell-text>
    <h-cell-input v-else-if="type == 1"
                  v-model="val"
                  @change="$emit('change',val)"
                  :cellData="cellData"
                  :isReadOnly="isReadOnly"
                  :isStar="isStar"></h-cell-input>
    <h-cell-textarea v-else-if="type == 2"
                     v-model="val"
                     @change="$emit('change',val)"
                     :cellData="cellData"
                     :isReadOnly="isReadOnly"
                     :isStar="isStar"></h-cell-textarea>
    <h-cell-number v-else-if="type == 3"
                   v-model="val"
                   @change="$emit('change',val)"
                   :cellData="cellData"
                   :isReadOnly="isReadOnly"
                   :isStar="isStar"></h-cell-number>
    <h-cell-floating v-else-if="type == 4"
                     v-model="val"
                     @change="$emit('change',val)"
                     :cellData="cellData"
                     :isReadOnly="isReadOnly"
                     :isStar="isStar"></h-cell-floating>
    <h-cell-date v-else-if="type == 5"
                 v-model="val"
                 @change="$emit('change',val)"
                 :cellData="cellData"
                 :isReadOnly="isReadOnly"
                 :isStar="isStar"></h-cell-date>
    <h-cell-time v-else-if="type == 6"
                 v-model="val"
                 @change="$emit('change',val)"
                 :cellData="cellData"
                 :isReadOnly="isReadOnly"
                 :isStar="isStar"></h-cell-time>
    <h-cell-select v-else-if="type == 7"
                   v-model="val"
                   @change="$emit('change',val)"
                   :cellData="cellData"
                   :isReadOnly="isReadOnly"
                   :isStar="isStar"></h-cell-select>
    <h-cell-switch v-else-if="type == 8"
                   v-model="val"
                   @change="$emit('change',val)"
                   :cellData="cellData"
                   :isReadOnly="isReadOnly"
                   :isStar="isStar"></h-cell-switch>
    <h-cell-page-radio v-else-if="type == 9"
                       v-model="val"
                       @change="$emit('change',val)"
                       :cellData="cellData"
                       :isReadOnly="isReadOnly"
                       :isStar="isStar"></h-cell-page-radio>
    <h-cell-page-checkbox v-else-if="type == 10"
                          v-model="val"
                          @change="$emit('change',val)"
                          :cellData="cellData"
                          :isReadOnly="isReadOnly"
                          :isStar="isStar"></h-cell-page-checkbox>
    <h-file-up v-else-if="type == 11"
               v-model="val"
               @change="$emit('change',val)"
               :cellData="cellData"
               :isReadOnly="isReadOnly"
               :isStar="isStar"></h-file-up>
    <h-cell-department v-else-if="type == 12"
                       v-model="val"
                       @change="$emit('change',val)"
                       :cellData="cellData"
                       :isReadOnly="isReadOnly"
                       :isStar="isStar"></h-cell-department>
  </div>
</template>

<script lang='ts'>
  import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
  import hCellText from "./components/h-cell-text.vue";
  import hCellInput from "./components/h-cell-input.vue";
  import hCellTextarea from "./components/h-cell-textarea.vue";
  import hCellNumber from "./components/h-cell-number.vue";
  import hCellFloating from "./components/h-cell-floating.vue";
  import hCellDate from "./components/h-cell-date.vue";
  import hCellTime from "./components/h-cell-time.vue";
  import hCellSelect from "./components/h-cell-select.vue";
  import hCellSwitch from "./components/h-cell-switch.vue";
  import hCellPageRadio from "./components/h-cell-page-radio.vue";
  import hCellPageCheckbox from "./components/h-cell-page-checkbox.vue";
  import hFileUp from "@/components/fileUp.vue";
  import hCellDepartment from "./components/h-cell-department.vue";
  @Component({
    components: {
      hCellText,
      hCellInput,
      hCellTextarea,
      hCellNumber,
      hCellFloating,
      hCellDate,
      hCellTime,
      hCellSelect,
      hCellSwitch,
      hCellPageRadio,
      hCellPageCheckbox,
      hFileUp,
      hCellDepartment
    }
  })
  export default class Page extends Vue {
    /**
     * 0.单行展示文本
     * 1.单行文本输入框
     * 2.多行文本输入框
     * 3.整数
     * 4.浮点数
     * 5.日期
     * 6.时间
     * 7下拉
     * 8.switch
     * 9.分页单选
     * 10.分页多选
     * 11.附件上传
     * 12.部门树形选择器
     * */
    // @Prop({ type: Number, required: true, default: 1 })
    // type: Number;

    @Prop({ type: Object, required: true })
    cellData: any;

    @Model("change", {})
    value: any;
    // value为只读属性 若改值将$emit("change", 将改变的值)   value = XX,将报错

    /** 复制value的值  可读可写  change返回该值 */
    val: any = this.value || null;

    //若父组件改变了数据  value值将会改变  此步骤为将val与value同步
    @Watch("value")
    onValueChange() {
      this.val = this.value;
    }

    /** 是否只读 */
    get isReadOnly() {
      let _bl = this.cellData.displaymode == 1 ? true : false;
      return _bl;
    }

    /** 是否必填 */
    get isStar() {
      let _bl = this.cellData.displaymode == 3 ? true : false;
      return _bl;
    }

    /** 是否隐藏 */
    get isShow() {
      let _bl = this.cellData.displaymode == 0 ? false : true;
      return _bl;
    }

    /** 展示状态 */
    get type() {
      let _type: number;
      // displaytype: 5, //单行文本=1  多行文本=2 带格式文本=3 CHECK框=4  选择项=5  关联选择=6  附件=7
      // datatype: "", /文本=1 整数=2 浮点数=3 日期=4 时间=5
      switch (this.cellData.formfield.displaytype) {
        case 1:
          switch (this.cellData.formfield.datatype) {
            case "1":
              _type = 1;
              break;
            case "2":
              _type = 3;
              break;
            case "3":
              _type = 4;
              break;
            case "4":
              _type = 5;
              break;
            case "5":
              _type = 6;
              break;
            default:
              _type = 1;
              break;
          }
          break;

        case 2:
          _type = 2;
          break;

        case 3:
          _type = 0;
          break;

        case 4:
          _type = 8;
          break;

        case 5:
          switch (this.cellData.formfield.datatype) {
            case "4":
              _type = 5;
              break;
            case "5":
              _type = 6;
              break;
            default:
              _type = 7;
              break;
          }
          break;

        case 6: // 关联选择  多选单选
          if (
            this.cellData.formfield.datatype == 6 ||
            this.cellData.formfield.datatype == 11
          ) {
            _type = 12;
          } else {
            _type = this.cellData.formfield.bemulti == "1" ? 10 : 9;
          }
          break;

        case 7: //附件上传
          _type = 11;
          break;

        default:
          _type = 0;
          break;
      }
      return _type;
    }
  }
</script>

<style lang='less' scoped>
  .h-cell {
    padding: 0 0.3rem;
  }
  .h-cell + .h-cell {
    border-top: 1px solid #ededed;
  }
</style>