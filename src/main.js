/**
 * main Js 文件
 * @JsName main
 * @Description Vue 程序入口文件
 * @DateTime 2017-10-17 13:47
 * @author 花花
 */
import Vue from 'vue'
import App from '@/app/App.vue'
import Router from 'vue-router'
import routers from '@/router/router'
import filter from '@/filter/filter'
import axios from '@/http/axios'
import VueAxios from 'vue-axios'
import Moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/**
 * 关闭生产模式下给出的提示
 */
Vue.config.productionTip = false
/**
 * 注册自定义过滤器
 */
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))
/**
 * 注册 VueAxios 插件
 */
// Vue.use(VueAxios)
Vue.use(VueAxios, axios)
/**
 * 添加 Moment 时间库到 Vue 的原型对象, 让Moment 时间库的方法在任何组件文件中都能通过 this.$moment 访问并使用
 */
Object.defineProperty(Vue.prototype, '$moment', { value: Moment })
/**
 * 注册 ElementUI 插件
 */
Vue.use(ElementUI)
/**
 * 注册路由插件
 */
Vue.use(Router)
/**
 * 创建路由实例
 */
const router = new Router({
  mode: 'history', // 配置路由模式
  routes: routers
})
/**
 * 注册一个全局前置导航守卫
 */
router.beforeEach((to, from, next) => {
  // 判断是否匹配到路由 ? 如果未匹配,匹配上级,上级也未匹配到则跳转登录页面 : 如果匹配到则正确跳转
  to.matched.length === 0 ? from.name ? next({ name: from.name }) : next('/') : next()
})
/**
 * 创建和挂载根实例
 */
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#App')
