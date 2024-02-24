import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: () => import('../views/Start.vue')
  },
  {
    path: '/start',
    name: 'Start',
    component: () => import('../views/Start.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue'),
    props: true
  },
  {
    path: '/leader',
    name: 'LeaderBoard',
    component: () => import('../views/LeaderBoard.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
