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
  // const fraction = ["角", "分"];
  // const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  // const unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
  // const head = n < 0 ? "欠" : "";
  // n = Math.abs(n);
  // let s = "";
  // for (let i = 0; i < fraction.length; i++) {
  //   s += (
  //     digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
  //   ).replace(/零./, "");
  // }
  // s = s || "整";
  // n = Math.floor(n);
  // for (let i = 0; i < unit[0].length && n > 0; i++) {
  //   let p = "";
  //   for (let j = 0; j < unit[1].length && n > 0; j++) {
  //     p = digit[n % 10] + unit[1][j] + p;
  //     n = Math.floor(n / 10);
  //   }
  //   s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  // }
  // return head + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零");

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
