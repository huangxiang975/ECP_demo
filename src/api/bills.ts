import request from "@/utils/request";

/** 单据列表数据获取 */
export function getReceiptsList(data) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.WfprocessAction?action=getnewwfprocesslist&status=${
      data.status
    }&page=${data.Page}&start=${data.start}&limit=${data.limit}`,
    method: "GET",
    data
  });
}

// 请求数据
export function getBillsDetails(id) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.FormAction?action=todoformviewdata1&processid=${id}`,
    method: "GET"
  });
}

// 退回接口
export function getBack(data) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.WfprocessAction?action=reject`,
    method: "GET",
    params: data
  });
}
// 同意接口
export function getSubmit(data) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.WfprocessAction?action=submit&tx=1`,
    method: "GET",
    params: data
  });
}
