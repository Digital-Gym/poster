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
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition){
    return savedPosition || new Promise((resolve) =>{
        setTimeout(() => resolve({top:0}), 500);
    })
}
})

export default router
