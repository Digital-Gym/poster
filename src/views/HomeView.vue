<script setup>
import PostCard from '../components/PostCard.vue'
import TheNavBar from '../components/TheNavBar.vue'

import {ref, onMounted, toRaw} from 'vue'
import { useAuthStore } from '@/stores/auth'

import axiosApiInstance from '../api/api'

const dbURL = import.meta.env.VITE_APP_DB_URL

const isClicked = ref(false)
const responseArray = ref()
const sourceData = ref([])

function fillSource(){
    let tempData = []
    for (const [x,y] of Object.entries(toRaw(responseArray.value))){
        tempData.push(y)
    }
    tempData.sort((a,b)=>b.timestamp-a.timestamp)
    sourceData.value = tempData
}

function turnOffSideBar(){
    isClicked.value = false
}

const getPosts = async () => {
    try{
        const res = await axiosApiInstance.get(`${dbURL}/posts.json`)
        responseArray.value = res.data
        fillSource()
    }

    catch(err){
        console.log(err.response)
    }
}

onMounted(async()=>{
    await getPosts()
})

</script>

<template>
    <TheNavBar v-model="isClicked"/>
    <div @click="turnOffSideBar" class="main">
        <h1 class="header-text">Home</h1>
        <div class="main-content">
            <PostCard 
                v-for="post in sourceData"
                :key="post.timestamp+post.author"
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