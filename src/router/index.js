import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Error',
    meta: {
      title: '无页面',
    },
    component: () => import('@/views/Auth')
  },
  {
    path: '/CleanToken',
    name: 'CleanToken',
    meta: {
      title: '清除缓存'
    },
    component: () => import('@/views/CleanToken')
  },
  {
    path: '/',
    name: 'Auth',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/Auth') //授权页、出发
  },
  {
    path: '/IndexYounger',
    name: 'IndexYounger',
    meta: {
      title: '任务',
      // keepAlive: true
    },
    component: () => import('@/views/IndexYounger') //师弟端-任务
  },
  {
    path: '/SeniorClass',
    name: 'SeniorClass',
    meta: {
      title: '师兄堂',
      // keepAlive: true
    },
    component: () => import('@/views/SeniorClass') //师弟端-师兄堂
  },
  {
    path: '/Bvrother',
    name: 'Bvrother',
    meta: {
      title: '师兄',
      // keepAlive: true
    },
    component: () => import('@/views/Bvrother') //师弟端-师兄
  },
  {
    path: '/Chat',
    name: 'Chat',
    meta: {
      title: '聊天',
      // keepAlive: true
    },
    component: () => import('@/views/Chat') //聊天
  },
  {
    path: '/PrivateChat',
    name: 'PrivateChat',
    meta: {
      title: '私聊',
      // keepAlive: true
    },
    component: () => import('@/views/PrivateChat') //私聊
  },
  {
    path: '/Bvrother1',
    name: 'Bvrother1',
    meta: {
      title: '师弟',
      // keepAlive: true
    },
    component: () => import('@/views/Bvrother1') //师兄端-师弟
  },
  {
    path: '/Message',
    name: 'Message',
    meta: {
      title: '拜师消息',
      // keepAlive: true
    },
    component: () => import('@/views/Message') //拜师消息
  },
  {
    path: '/SeniorClass1',
    name: 'SeniorClass1',
    meta: {
      title: '师兄堂',
      // keepAlive: true
    },
    component: () => import('@/views/SeniorClass1') //师兄端-师兄堂
  },
  {
    path: '/End',
    name: 'End',
    meta: {
      title: '结束',
      // keepAlive: true
    },
    component: () => import('@/views/End') //结束页
  },
  {
    path: '/Test',
    name: 'Test',
    meta: {
      title: '测试页面',
    },
    component: () => import('@/views/Test')
  }
]

const router = new VueRouter({
  routes
})

export default router
