import request from "@/utils/request";

// 请求数据列表
export function getNewApprove(id) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.FormAction?action=formviewdata&type=2&dowid=${id}`,
    method: "GET"
  });
}

// 保存表单数据
export function getSave(data, id) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.FormAction?action=createformdata&type=2&dowid=${id}`,
    method: "POSt",
    params: {
      datas: data
    }
  });
}