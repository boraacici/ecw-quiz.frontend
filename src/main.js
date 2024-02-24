import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import '../src/assets/style/core.css'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/start'
    },
    {
      path: '/start',
      name: 'Start',
      component: () => import('./views/Start.vue')
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('./views/Game.vue'),
      props: true
    },
    {
      path: '/leader',
      name: 'LeaderBoard',
      component: () => import('./views/LeaderBoard.vue'),
      props: true
    }
  ]
})

app.use(router)
app.mount('#app')