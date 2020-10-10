
const systemManage = {
  path: '/user',
  name: 'user',
  component: () => import("@/views/layout"),
  meta: { title: '用户管理', icon: 'el-icon-location' },
  children: [
    {
      path: 'home',
      name: 'home',
      meta: {
        title: '用户列表',
        component: 'user/home'
      }
    }
  ]
}

export default systemManage
