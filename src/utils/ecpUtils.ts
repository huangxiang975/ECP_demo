/** 总金额计算 */
function SUM(form: any, arg) {
  // form = {
  //   maintable: { id: "value" },
  //   detailtables: {
  //     id: [{ id: "value", id1: "value1" }, { id: "value" }]
  //   }
  // };
  let NumberVal: number = 0;
  if (!!form.maintable[arg]) {
    NumberVal += Number(form.maintable[arg]);
  } else {
    let HasCol = false;
    for (const _KEY_ of Object.keys(form.detailtables)) {
      if (HasCol) {
        break;
      }
      const _EL_ = form.detailtables[_KEY_];
      _EL_.forEach(element => {
        if (!!element[arg]) {
          HasCol = true;
          NumberVal += Number(element[arg]);
        }
      });
    }
  }

  return NumberVal.toString();
}

function GetCapital(n) {

  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return "数据非法";
  }

  if (n === "0") {
    return "";
  }

  let unit = "千百拾亿千百拾万千百拾元角分",
    str = "";
  n += "00";
  const p = n.indexOf(".");
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2);
  }
  unit = unit.substr(unit.length - n.length);
  for (let i = 0; i < n.length; i++) {
    str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);
  }
  return str
    .replace(/零(千|百|拾|角)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零(万|亿|元)/g, "$1")
    .replace(/(亿)万|壹(拾)/g, "$1$2")
    .replace(/^元零?|零分/g, "")
    .replace(/元$/g, "元整");
}

/** 计算数据大写 */
function RMB(form: any, arg) {
  let NumberStr: string = "";
  if (!!form.maintable[arg]) {
    NumberStr = GetCapital(form.maintable[arg]);
  }

  return NumberStr;
}

export default {
  SUM,
  RMB
};
