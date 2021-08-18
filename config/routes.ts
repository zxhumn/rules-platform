export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    name: '常量变量',
    icon: 'smile',
    path: '/rule/code',
    component: './rule/code/index',
  },
  // {
  //   name: '知识包管理',
  //   icon: 'smile',
  //   path: '/rule/packs',
  //   component: './rule/packs/index',
  // },
  // {
  //   name: '规则集',
  //   icon: 'smile',
  //   path: 'ruleSet',
  //   routes: [
  //     {
  //       path: '/ruleSet/index',
  //       component: './ruleSet/rule/index',
  //     },
  //     {
  //       path: '/ruleSet/edit',
  //       component: './ruleSet/rule/RuleEdit',
  //     },
  //   ],
  // },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
