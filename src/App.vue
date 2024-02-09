<script setup>
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

function checkUser(){
  const local = JSON.parse(localStorage.getItem('userInfo'))

  if (local){
    authStore.userInfo.token = local.token
    authStore.userInfo.refreshToken = local.refreshToken
    authStore.userInfo.expiresIn = local.expiresIn
    authStore.userInfo.userId = local.userId
  }
}

checkUser()
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>

</style>
