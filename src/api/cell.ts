import request from "@/utils/request";
import store from "@/store/index";

/** 下拉框数据获取 */
export function getSelectData(id) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.FormAction?action=getselect&selectid=${id}&page=1&start=0&limit=25`,
    method: "GET"
  });
}

/** 浏览框数据获取 */
export function getBrowseData(form) {
  return request({
    url: `/ext/com.cinsea.mobile.ext.ReportAction?action=getbrowser&browserid=${
      form.id
    }&key=${form.value}&page=${form.Page}&start=${form.start}&limit=${
      form.limit
    }`,
    method: "GET"
  });
}
