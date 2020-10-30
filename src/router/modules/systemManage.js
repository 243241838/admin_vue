
const systemManage = {
  path: '/systemManage',
  name: 'systemManage',
  hidden: false,
  redirect: "/systemManage/user",
  component: "layout",
  meta: {
    title: "系统管理",
    noCache: false,
    icon: "edit"
  },
  children: [
    {
      path: 'list',
      name: 'list',
      component: "systemManage/list",
      meta: {
        title: '系统管理列表',
        noCache: false
      }
    }
  ]
}

export default systemManage
