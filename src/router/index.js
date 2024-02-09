import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadView.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import('../views/Settings.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      isAuth: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      isAuth: false
    }
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

router.beforeEach((to, from, next)=>{
  const authStore = useAuthStore();

  if(to.meta.isAuth && !authStore.userInfo.token){
    next({name: "login"});
  }
  else if(!to.meta.isAuth && authStore.userInfo.token){
    next({name: "home"});
  }
  else{
    next();
  }
})

export default router
