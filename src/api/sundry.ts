import request from "@/utils/request";
import store from "@/store/index";

/** 获取手机端应用配置列表 */
export function getAppLists() {
  return request({
    url: `/ext/com.cinsea.mobile.ext.MenuAction?action=getmenu&page=1&start=0&limit=25`,
    method: "GET"
  });
}

/** 下拉框数据获取 */
export function getSelectData(id) {
  return request({
    // url: `/ext/com.cinsea.mobile.ext.FormAction?action=getselect&selectid=${id}&page=1&start=0&limit=10`,
    url: `/ext/com.cinsea.mobile.DataRequetExt?action=getselect&selectid=${id}&page=1&start=0&limit=10`,
    method: "GET"
  });
}

/** 附件上传 */
export function getFileUp(data) {
  return request({
    url: `/ext/dd.StaicFileUpload?action=ajax`,
    method: "POST",
    data
  });
}

/** 附件数据获取 */
export function getFileData(ids) {
  return request({
    url: `/ext/com.cinsea.mobile.DataRequetExt?type=file&ids=${ids}`,
    method: "GET",
  });
}

/** 根据id获取name 下拉 浏览框使用 */
export function getSelectedName(data) {
  return request({
    // url: `/static/action/com.cinsea.mobile.DataRequet?type=${
    //   data.type
    // }&typeid=${data.typeid}&ids=${data.ids}`,
     url: `/ext/com.cinsea.mobile.DataRequetExt?type=${
      data.type
    }&typeid=${data.typeid}&ids=${data.ids}`,
    method: "GET"
  });
}
