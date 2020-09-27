import request from '@/utils/request'
let url = process.env.VUE_APP_BASE_URL
// 获取权限
export function getPermission(data) {
  return request({
    url: `${url}devops.index.permission`,
    method: 'post',
    data: data
  })
}
