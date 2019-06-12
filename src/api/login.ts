import request from "@/utils/request";

export function getToken(code) {
  return request({
    url: `/ext/com.cinsea.ext.LoginAction?action=ddloginout&code=${code}`,
    method: "GET"
  });
}
