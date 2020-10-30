
const systemManage = {
  path: '/user',
  name: 'user',
  component: "layout",
  redirect: "/user/charts",
  meta: {
    title: '用户管理',
    noCache: false,
    icon: 'location'
  },
  children: [
    {
      path: 'home',
      name: 'home',
      hidden: false,
      component: 'user/home',
      meta: {
        title: '用户列表',
        noCache: false,
      }
    }
  ]
}

export default systemManage
