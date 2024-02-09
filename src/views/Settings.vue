<script setup>
import { useRouter } from 'vue-router';
import {useAuthStore} from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function logout(){
    localStorage.removeItem("userInfo")
    authStore.logout()
    router.push({name: "login"})
}
</script>

<template>
    <div class="main">
        <h1 class="header">Settings</h1>
        <div class="main-content">
            <button class="btn" @click.prevent="logout">Logout</button>
        </div>

    </div>

</template>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.header{
    margin-bottom: 20px;
}

.btn{
    background-color: transparent;
    border: solid 1px var(--color-border);
    border-radius: 10px;
    color: var(--color-text);

    width: 100px;
    height: 33px;
}

.btn:hover{
    border-color: rgb(168, 1, 1);
    box-shadow: 0rem 0rem 1rem rgb(222, 3, 3);
    transition: all .3s ease;
}

</style>