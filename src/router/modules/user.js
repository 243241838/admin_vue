
const systemManage = {
  path: '/user',
  name: 'user',
  component: () => import("@/views/layout"),
  meta: { title: '用户管理', icon: 'el-icon-menu' },
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
