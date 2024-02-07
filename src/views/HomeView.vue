<script setup>
import PostCard from '../components/PostCard.vue'
import TheNavBar from '../components/TheNavBar.vue'

import {ref, onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

// import sourceData from "../../posts.json"

const isClicked = ref(false)
const sourceData = ref()

function turnOffSideBar(){
    isClicked.value = false
}

const getPosts = async () => {
    try{
        const res = await axios
        .get(`https://jwt-fb-vue3-12dc3-default-rtdb.europe-west1.firebasedatabase.app/posts.json`)
        sourceData.value = res.data
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