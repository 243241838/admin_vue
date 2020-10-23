
const systemManage = {
  path: '/user',
  name: 'user',
  hidden: false,
  component: "layout",
  meta: { 
    title: '用户管理', 
    icon: 'location' 
  },
  children: [
    {
      path: 'home',
      name: 'home',
      hidden: false,
      component: 'user/home',
      meta: {
        title: '用户列表'
      }
    }
  ]
}

export default systemManage
