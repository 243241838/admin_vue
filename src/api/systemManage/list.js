import request from "@/utils/request";
let url = process.env.VUE_APP_BASE_URL;
// 列表
export function getList(data) {
  return request({
    url: `${url}devops.index.statistics`,
    method: "get",
    params: data,
  });
}
// add // 添加编辑通用一个
export function add(data) {
  if (data.id) {
    return update(data);
  }
  return request({
    url: `${url}devops.index.add`,
    method: "post",
    data: data,
  });
}
//更新
function update(data) {
  return request({
    url: `${url}devops.index.update`,
    method: "post",
    data: data,
  });
}
