<script setup>
import PostCard from '../components/PostCard.vue'
import TheNavBar from '../components/TheNavBar.vue'

import sourceData from "../../posts.json"


</script>

<template>
    <TheNavBar class="nav-bar"/>
    <div class="main">
        <h1>Home</h1>
        <div class="main-content">
            <PostCard 
                v-for="post in sourceData"
                :post=post
            />
        </div>
    </div>
</template>

<style scoped>
.main{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    /* border: solid 1px blue; */
}

.main-content{
    margin-top: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    
    /* border: solid 1px red; */
    width: 50%;
}

.nav-bar{
    position:fixed;
    width: 100%;
}
</style>