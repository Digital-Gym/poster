import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadView.vue')
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import('../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
