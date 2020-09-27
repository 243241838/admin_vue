import request from '@/utils/request'
let url = process.env.VUE_APP_BASE_URL
//统计
export function statistics(data) {
  return request({
    url: `${url}devops.index.statistics`,
    method: 'post',
    data: data
  })
}
