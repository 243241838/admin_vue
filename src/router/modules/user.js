
const systemManage = {
  path: '/user',
  name: 'user',
  component: () => import("@/views/layout"),
  meta: { title: '系统管理', icon: 'el-icon-location' },
  children: [
    {
      path: 'home',
      name: 'home',
      meta: {
        title: 'home',
        component: 'user/home'
      }
    }
  ]
}

export default systemManage
