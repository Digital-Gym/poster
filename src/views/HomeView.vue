<script setup>
import PostCard from '@/components/PostCard.vue'
import TheNavBar from '@/components/TheNavBar.vue'

import {ref, onMounted, toRaw, computed} from 'vue'

import axiosApiInstance from '@/api/api';
import { getLastId } from '@/utils/get';

const dbUrl = import.meta.env.VITE_APP_DB_URL

const pageSize = 0

const isClicked = ref(false)
const responseArray = ref()
const sourceData = ref([])
const id = ref();

const canLoadMore = computed(()=>{return id.value >= 1 ? true : false})

function fillSource(){
    let tempData = []
    for (const [x,y] of Object.entries(toRaw(responseArray.value))){
        tempData.push(y)
    }
    tempData.sort((a,b)=>b.timestamp-a.timestamp)
    sourceData.value = [...sourceData.value, ...tempData]
}

function turnOffSideBar(){
    isClicked.value = false
}

async function getMorePosts(){
    try{
        id.value = id.value - pageSize - 1
        const res = await axiosApiInstance.get(`${dbUrl}/posts.json?orderBy="id"&startAt=${id.value}&endAt=${id.value+pageSize}`)
        responseArray.value = res.data
        fillSource()
    }

    catch(err){
        console.log('ERROR', err)
        console.log(err.response)
    } 
}

const getPosts = async () => {
    try{
        id.value -= pageSize
        const res = await axiosApiInstance.get(`${dbUrl}/posts.json?orderBy="id"&startAt=${id.value}&endAt=${id.value + pageSize}`)
        responseArray.value = res.data
        fillSource()
    }

    catch(err){
        console.log(err.response)
    }
}

onMounted(async()=>{
    id.value = await getLastId()
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
            <button 
                v-if="canLoadMore"
                @click="getMorePosts"
                class="load-more-btn"
                >Load more
            </button>
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

.load-more-btn{
    border: solid 1px green;
    border-radius: 10px;
    width: 30%;
    height: 35px;
    margin-bottom: 20px;
    background-color: transparent;
    color: var(--color-heading);
}

.load-more-btn:hover{
    transition: all .3s ease;
    box-shadow: 0rem 0rem 1rem rgb(0, 181, 60);
}

</style>