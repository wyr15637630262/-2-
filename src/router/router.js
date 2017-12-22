/**
 * router Js 文件
 * @JsName router
 * @Description Vue 程序路由文件
 * @DateTime 2017-10-17 13:47
 * @author 亚茹
 */
const router = [
  {
    path: '/',
    name: 'App',
    redirect: (to) => { // 重定向到路由
      return 'logIn'
    }
  },
  {
    path: '/logIn',
    name: 'logIn',
    component: resolve => require(['@/module/logIn/logIn.vue'], resolve)
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/module/index/index.vue'], resolve),
    children: [
      {
        path: '/memberList',
        name: 'memberList',
        component: resolve => require(['@/module/member/memberList.vue'], resolve)
      },
      {
        path: '/memberDetail',
        name: 'memberDetail',
        component: resolve => require(['@/module/member/memberDetail.vue'], resolve)
      },
      {
        path: '/commoditySpec',
        name: 'commoditySpec',
        component: resolve => require(['@/module/commodity/commoditySpec.vue'], resolve)
      },
      {
        path: '/commodityVariety',
        name: 'commodityVariety',
        component: resolve => require(['@/module/commodity/commodityVariety.vue'], resolve)
      },
      {
        path: '/commodityTag',
        name: 'commodityTag',
        component: resolve => require(['@/module/commodity/commodityTag.vue'], resolve)
      },
      {
        path: '/commodityType',
        name: 'commodityType',
        component: resolve => require(['@/module/commodity/commodityType.vue'], resolve)
      },
      {
        path: '/commodityBank',
        name: 'commodityBank',
        component: resolve => require(['@/module/commodity/commodityBank.vue'], resolve)
      },
      {
        path: '/increaseType',
        name: 'increaseType',
        component: resolve => require(['@/module/commodity/increaseType.vue'], resolve)
      },
      {
        path: '/commodityExample',
        name: 'commodityExample',
        component: resolve => require(['@/module/commodity/commodityExample.vue'], resolve)
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: resolve => require(['@/module/order/orderList.vue'], resolve)
      },
      {
        path: '/orderDetail',
        name: 'orderDetail',
        component: resolve => require(['@/module/order/orderDetail.vue'], resolve)
      },
      {
        path: '/storeList',
        name: 'storeList',
        component: resolve => require(['@/module/store/storeList.vue'], resolve)
      },
      {
        path: '/storeDetail',
        name: 'storeDetail',
        component: resolve => require(['@/module/store/storeDetail.vue'], resolve)
      },
      {
        path: '/storeAdd',
        name: 'storeAdd',
        component: resolve => require(['@/module/store/storeAdd.vue'], resolve)
      },
      {
        path: '/storeModify',
        name: 'storeModify',
        component: resolve => require(['@/module/store/storeModify.vue'], resolve)
      },
      {
        path: '/storeGroup',
        name: 'storeGroup',
        component: resolve => require(['@/module/store/storeGroup.vue'], resolve)
      }
    ]
  }
]
export default router
