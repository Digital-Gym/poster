<script setup>
import PostCard from '../components/PostCard.vue'
import sourceData from "../../posts.json"


</script>

<template>
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
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    
    /* border: solid 1px red; */
    width: 70%;
}
</style>