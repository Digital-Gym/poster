<script setup>
import PostCard from '../components/PostCard.vue'
import TheNavBar from '../components/TheNavBar.vue'

import sourceData from "../../posts.json"
import {ref} from 'vue'

const isClicked = ref(false)

function turnOffSideBar(){
    isClicked.value = false
}

</script>

<template>
    <TheNavBar v-model="isClicked"/>
    <div @click="turnOffSideBar" class="main">
        <h1 class="header-text">Home</h1>
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


.header-text{
    margin-top: 10px;
    margin-bottom: 0px;
    color: var(--color-heading);
}
</style>