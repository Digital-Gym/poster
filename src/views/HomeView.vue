<script setup>
import PostCard from '../components/PostCard.vue'
import sourceData from "../../posts.json"


</script>

<template>
    <h1>Home</h1>
    <div class="main-content">
        <PostCard 
            v-for="post in sourceData"
            :post=post
        />
    </div>
</template>

<style scoped>
.main-content{
    width: 75%;
}
</style>