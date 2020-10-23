const systemManage = {
  path: "/systemManage",
  name: "systemManage",
  hidden: false,
  component: "layout",
  meta: {
    title: "系统管理",
    icon: "setting",
  },
  children: [
    {
      path: "list",
      name: "list",
      hidden: false,
      component: "systemManage/list",
      meta: {
        title: "系统管理列表"
      },
    },
  ],
};

export default systemManage;
