import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyBsfj2zyG1g67bUINNwCBW4tTiRyOcOUPQ",
  authDomain: "jwt-fb-vue3-12dc3.firebaseapp.com",
  projectId: "jwt-fb-vue3-12dc3",
  storageBucket: "jwt-fb-vue3-12dc3.appspot.com",
  messagingSenderId: "945805463475",
  appId: "1:945805463475:web:5daaee0c643b6343f8c5c6"
};

initializeApp(firebaseConfig)

const app = createApp(App)
const pinia = createPinia()

app
.use(router)
.use(pinia)
.mount('#app')
