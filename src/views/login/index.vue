<!-- 登录页 -->
<template>
  <div class=''></div>
</template>

<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import { getToken } from "@/api/login";
  import * as dd from "dingtalk-jsapi";

  @Component({})
  export default class login extends Vue {
    loadToken(code) {
      getToken(code)
        .then((res: any) => {
          if (typeof res === "string") {
            this.$messagebox.confirm(`res`);
            return false;
          }
          let _data = res.data;
          this.$indicator.close();
          if (_data.flag === "success") {
            let _token: string = `${_data.accesscode}`;
            sessionStorage.setItem("token", _token);
            let query: any = this.$route.query;
            let callback: string = query.callback;
            if (callback) {
              this.$router.replace(callback);
            } else {
              this.$router.replace("/");
            }
          } else {
            this.$messagebox.confirm(_data.msg);
          }
        })
        .catch(err => {
          this.$indicator.close();
        });
    }
    loadCode() {
      this.$indicator.open("身份验证中...");
      dd.ready(() => {
        dd.runtime.permission
          .requestAuthCode({
            corpId: process.env.VUE_APP_CORPID
          })
          .then(res => {
            let _code: String = res.code;
            this.loadToken(_code);
          })
          .catch(err => {
            this.$messagebox.confirm(err);
            this.$indicator.close();
          });
      });
    }

    created() {
      this.loadCode();
    }
  }
</script>

<style lang='less' scoped>
</style>