<!-- 图片上传组件 -->
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
          <img :src="item.url"
               v-if="calculateIsImg(item.objname)"
               @click="clickImg(item.url)"
               class="file-list-img fl">
          <img src="@/assets/img/file-img.svg"
               v-else
               class="file-list-img fl">
          <div class="img-describe">
            <div class="name ellipsis">{{item.objname}}</div>
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
  import { Component, Vue, Prop, Emit, Model } from "vue-property-decorator";
  import { getFileUp, getFileData } from "@/api/sundry";
  import * as dd from "dingtalk-jsapi";

  @Component
  export default class Page extends Vue {
    @Prop({ type: Object, required: true }) cellData: any;
    @Prop({ type: Boolean, default: false }) isReadOnly: boolean;
    @Prop({ type: Boolean, default: false }) isStar: boolean;
    @Model("change", { type: String, default: "" })
    value: string;
    val: string = this.value || "";

    fileData: any[] = [];
    // imgData:any = {}

    addImg(event) {
      if (this.isReadOnly) {
        return;
      }
      let _file = event.target.files;
      let _formData = new FormData();
      let _fileLength = _file.length;
      if (_fileLength > 0) {
        for (let i = 0; i < _fileLength; i++) {
          const element = _file[i];
          _formData.append(`file${i + 1}`, element);
        }
      }
      this.getFileUp(_formData);
    }

    getFileUp(file) {
      getFileUp(file).then(res => {
        let _data: string = res.data;
        if (_data) {
          if (this.val == "") {
            this.val += _data;
          } else {
            this.val = this.val + "," + _data;
          }
          this.$emit("change", this.val);
          this.getFileData();
        } else {
          this.$toast("附件上传失败!");
        }

        //  清除file数据
        // let _file_dom: any = document.getElementById("fileupload");
        // _file_dom.value = "";
      });
    }

    calculateIsImg(n) {
      let name = n,
        regular = /\.txt|\.jpg|\.svg/;
      if (regular.test(name)) {
        return true;
      } else {
        return false;
      }
    }

    getFileData() {
      if (!this.val) {
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

    // addImg(event) {
    //   let _file = event.target.files;
    //   for (let i = 0; i < _file.length; i++) {
    //     if (this.imgData.length < 9) {
    //       let obj = {
    //         url: URL.createObjectURL(_file[i]),
    //         file: _file[i]
    //       };
    //       this.imgData.push(obj);
    //     } else {
    //       this.$toast({
    //         message: "图片上传最多可上传9张",
    //         duration: 1500
    //       });
    //       return;
    //     }
    //   }
    //   //  清除file数据
    //   let _file_dom: any = document.getElementById("fileupload");
    //   _file_dom.value = "";
    // }

    // img_del_click(i) {
    //   this.imgData.splice(i, 1);
    // }
  }
</script>

<style lang='less' scoped>
  .file-box {
    margin-top: 0.2rem;
    // padding: 0 0.3rem;
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
          .img-describe {
            margin-left: 1rem;
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

      .img-del {
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
        width: 12px;
        height: 12px;
        background: url("../assets/img/img-del.png") no-repeat;
        background-size: 100%;
        z-index: 999;
      }
    }
  }
</style>