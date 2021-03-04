import Vue from 'vue'
import App from './App.vue'
import "normalize.css"
import router from './router'
import store from './store'
import ajax from './until/ajax'
import 'iview/dist/styles/iview.css'
import 'vant/lib/index.css'

// 引入自己写的一些公用样式
import './assets/css/public.css'

// 引入自己封装的一些常用方法
import Common from './until/common.js'
Vue.use(Common)

// vuex仓库
import Vuex from 'vuex'
Vue.use(Vuex)

// 有赞组件
import {
  NoticeBar,Icon,Pagination,Dialog,Toast
} from 'vant'
Vue.use(NoticeBar)
    .use(Icon)
    .use(Pagination)
    .use(Dialog)
    .use(Toast)

// iView组件
import {Notice} from 'iview';
Vue.prototype.$Notice = Notice

let getUserinfo = function (to, next) {
  ajax.get({
    url: '/User/getInfo',
    userinfo: true
  }).then((res) => {
    store.commit('setUserinfo', res.result.data)
    next()
  })
}

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.token && !store.state.accessToken) {
    next({
      name: 'Auth'
    })
  } else if (to.meta.userinfo && !store.state.userinfo) {
    getInfo(next)
  } else {
    next()
  }
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.pageYOffset = 0
  document.scrollTop = '0px'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Date.prototype.formatDate = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
