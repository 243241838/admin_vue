export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  if (time === undefined || time === null) return "";

  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time == "object") {
    date = time;
  } else {
    if (("" + time).length === 10) {
      time = parseInt(time) * 1000;
    }
    date = new Date(time);
  }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      if (key === "a")
        return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    });
    return time_str;
}
export function formatMoney(value) {
  if (value) {
    return (value / 100).toFixed(2);
  } else {
    return "0.00";
  }
}
export function forma(value) {
  if (value) {
    return (value * 100).toFixed(2);
  } else {
    return "0.0";
  }
}
export function forma1(value) {
  if (value) {
    return value.toFixed(1);
  } else {
    return "0.0";
  }
}
export function formatTime(value, that, params, startName, endName) {
  if (value) {
    let start = value.match(/(\S*)至/)[1];
    let end = value.match(/至(\S*)/)[1];
    if (params) {
      that[params][startName] = start;
      that[params][endName] = end;
    } else {
      that[startName] = start;
      that[endName] = end;
    }
  } else {
    if (params) {
      that[params][startName] = "";
      that[params][endName] = "";
    } else {
      that[startName] = "";
      that[endName] = "";
    }
  }
}
