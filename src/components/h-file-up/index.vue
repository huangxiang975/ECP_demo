<!-- 图片上传组件 单附件上传 绑定值为id -->
<template>
  <div class='file-box bgc-fff'>
    <div class="file-title">
      <span class="star"
            v-if="isStar">*</span>
      {{cellData.formfield.labelname || 添加附件}}
    </div>
    <div class="file-main">
      <div class="file-list-box"
           v-for="(item ,index) in fileData"
           :key="index">
        <div class="file-list box-b">
          <div class="btn-box fr"
               @click="clickFileDel(index)">
            <img src="@/assets/img/file-del.svg">
          </div>
          <img :src="item.url"
               v-if="calculateIsImg(item.objname)"
               @click="clickImg(item.url)"
               class="file-list-img fl">
          <img src="@/assets/img/file-img.svg"
               v-else
               class="file-list-img fl">
          <div class="img-describe">
            <div @click="fileDl(item.url,item.objname)"
                 class="name ellipsis">{{item.objname}}</div>
            <div class="time ellipsis">{{item.createtime}}</div>
          </div>
        </div>
      </div>
      <label for="fileupload"
             v-show="!isReadOnly"
             class="picture-label">
        <div class="add-file img-list dp-ib">
          <img src="@/assets/img/add-file.svg">
        </div>
      </label>
      <form name="imgForm"
            id="imgForm">
        <input @change='addImg($event)'
               type="file"
               accept="image/*"
               id="fileupload"
               name="file"
               multiple
               style="display:none">
      </form>
    </div>
  </div>
</template>

<script lang='ts'>
  import {
    Component,
    Vue,
    Prop,
    Emit,
    Model,
    Watch
  } from "vue-property-decorator";
  import { getFileUp, getFileData, getFileDl } from "@/api/sundry";
  import * as dd from "dingtalk-jsapi";

  @Component
  export default class Page extends Vue {
    @Prop({ type: Object, required: true }) cellData: any;
    @Prop({ type: Boolean, default: false }) isReadOnly: boolean;
    @Prop({ type: Boolean, default: false }) isStar: boolean;
    @Model("change", { type: String, default: "" })
    value: string;
    val: string = this.value || "";
    @Watch("value")
    watchVal() {
      this.val = this.value;
      this.getFileData();
    }
    @Emit("change")
    changeVal(val) {}

    fileData: any[] = [];

    /** 添加附件 */
    addImg(event) {
      if (this.isReadOnly) {
        return;
      }
      const _FILE_ = event.target.files,
        _FILE_LENGTH = _FILE_.length;
      const _FORM_DATA_ = new FormData();
      if (_FILE_LENGTH > 0) {
        for (let i = 0; i < _FILE_LENGTH; i++) {
          const element = _FILE_[i];
          _FORM_DATA_.append(`file${i + 1}`, element);
        }
      }
      this.getFileUp(_FORM_DATA_);
    }

    getFileUp(file) {
      getFileUp(file).then(res => {
        let _data: string = res.data;
        if (_data) {
          if (this.val == "") {
            this.val += _data;
          } else {
            this.val = this.val + _data;
          }
          this.changeVal(this.val);
          this.getFileData();
        } else {
          this.$toast("附件上传失败!");
        }
        //  清除file数据
        const FileDom: any = document.getElementById("fileupload");
        FileDom.value = "";
      });
    }

    /** 通过正则验证文件是否为图片 */
    calculateIsImg(n) {
      let name = n,
        regular = /\.jpg|\.svg|\.png/;
      if (regular.test(name)) {
        return true;
      } else {
        return false;
      }
    }

    /** 附件下载 */
    fileDl(url, name) {
      window.open(url);
    }

    /** 附件删除 */
    clickFileDel(i) {
      const fileStr = this.val,
        fileArr = fileStr.split(",");
      fileArr.splice(i, 1);
      this.changeVal(fileArr.join(","));
    }

    /** 获取附件数据 */
    getFileData() {
      if (!this.val) {
        this.fileData = [];
        return false;
      }
      getFileData(this.val)
        .then(res => {
          let data: any[] = res.data;
          this.fileData = data;
        })
        .catch(err => {
          console.log(err);
        });
    }

    /** 点击图片缩略图  点击查看放大图 */
    clickImg(url) {
      dd.ready(() => {
        dd.biz.util.previewImage({
          urls: [url], //图片地址列表
          current: url //当前显示的图片链接
        });
      });
    }

    created() {
      this.getFileData();
    }
  }
</script>

<style lang='less' scoped>
  .file-box {
    .file-title {
      font-size: 0.32rem;
      color: #333;
      line-height: 1rem;
    }
    .file-main {
      padding: 0.2rem 0;
      .file-list-box {
        padding: 0.12rem 0;
        .file-list {
          height: 0.7rem;
          .file-list-img {
            height: 0.7rem;
            width: 0.7rem;
          }
          .btn-box {
            width: 0.3rem;
            height: 0.3rem;
            padding: 0.2rem 0 0 0.2rem;
            font-size: 0;
            line-height: 1;
          }
          .img-describe {
            margin: 0 0.6rem 0 1rem;
            height: 0.7rem;
            .name {
              line-height: 0.4rem;
              font-size: 0.28rem;
              color: #333;
            }
            .time {
              line-height: 0.3rem;
              font-size: 0.22rem;
              color: #999;
            }
          }
        }
      }
      .img-list {
        width: 0.9rem;
        height: 0.9rem;
        margin: 0 0.2rem 0.2rem 0;
      }
    }
  }
</style>