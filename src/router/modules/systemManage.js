
const systemManage = {
  path: '/systemManage',
  name: 'systemManage',
  component: () => import("@/layout"),
  meta: { title: '系统管理', icon: 'el-icon-location' },
  children: [
    {
      path: 'list',
      name: 'list',
      meta: {
        title: 'list',
        component: 'systemManage/list'
      }
    }
  ]
}

export default systemManage
