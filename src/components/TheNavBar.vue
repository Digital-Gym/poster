<script setup>
import HomeIcon from '../components/icons/Home.vue'
import PostIcon from '../components/icons/Post.vue'
import SettingsIcon from '../components/icons/Settings.vue'
import SupportIcon from '../components/icons/Support.vue'

import {getUserEmail} from '@/utils/get'
import { onMounted } from 'vue'

const isClicked = defineModel({ default: false })
let name = null

onMounted(async ()=>{
    name = await getUserEmail()
})

</script>

<template>
    <div class="nav-bar">
        <nav>
            <button @click="isClicked = !isClicked" class="submenu" :class="{rotated: isClicked}">=</button>
            <div></div>
            <RouterLink class='btn_upload' :to="{name: 'upload'}">Upload</RouterLink>
        </nav>
        <Transition>
            <div v-if="isClicked" class="sidebar">
                <div class="bar-content">
                    <div class="bar-avatar">
                        <img src="/images/avatar.png" alt="avatar" />
                        <h2>{{ name || 'User' }}</h2>
                    </div>
                    <div class="bar-links">
                        <RouterLink :to="{name: 'home'}" class="bar_btn"><HomeIcon />Home</RouterLink>
                        <RouterLink :to="{name: 'upload'}" class="bar_btn"><PostIcon />New post</RouterLink>
                        <RouterLink :to="{name: 'settings'}" class="bar_btn"><SettingsIcon/>Settings</RouterLink>
                    </div>
                    <div></div>
                    <a class="bar_btn donate" href="https://www.buymeacoffee.com/mmnvb"><SupportIcon/>Donate</a>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.nav-bar{
    position: fixed;
    width: 100%;
}

nav{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;

    /* border: solid 1px red; */
}
.btn_upload{
    text-decoration: none;
    color: var(--color-heading);
    margin-right: 40px;

    border: solid 1px rgb(0, 102, 255);
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
}

.btn_upload:hover{
    border-color: rgb(70, 144, 255); 
}

.btn_upload:active{
    border-color: rgb(141, 187, 255); 
}

.submenu{
    margin-left: 40px;
    background-color: transparent;
    color: var(--color-heading);
    border: solid transparent;
    font-size: 2rem;
    transition: all .3s ease;
}

.submenu:hover{
    cursor: pointer;
    color: var(--color-text);
}

.sidebar{
    width: 250px;
    height: 400px;
    left: 40px;

    position: fixed;
    background-color: var(--color-background-soft);
    border: solid 1px var(--color-border);
    border-radius: 15px;

    display: flex;
    justify-content: center;

}
.bar-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: 90%;
    /* border: solid 1px red; */
}

.bar-links{
    width: 100%;
    height: 33%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    /* border: solid 1px blue; */
}

.bar_btn{
    text-decoration: none;
    color: var(--color-text);

    border: solid 1px var(--color-border);
    border-radius: 10px;
    width: 100%;
    height: 35px;
    padding-left: 10px;
    
    display: flex;
    align-items: center;
}

.bar_btn:hover{
    border-color: var(--color-border-hover);
}

.donate{
    border-color: rgba(131, 0, 131, 0.443);
}

.donate:hover{
    border-color: rgba(131, 0, 131, 0.736);
}

.bar-avatar img{
    width: 30%;
    border: solid var(--color-border);
    border-radius: 50%;
    
}

.bar-avatar{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.bar-avatar img:hover{
    border-color: var(--color-border-hover);
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.rotated{
    transform: rotate(90deg);
}
</style>