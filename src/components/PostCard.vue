<script setup>
import HeartIcon from "../components/icons/Heart.vue"
import CommentIcon from "../components/icons/Comment.vue"

import {useLikeStore} from "@/stores/likes"

defineProps(['post'])

const likeStore = useLikeStore()

function like(post){
    if (!likeStore.isLiked(post.id)){
        likeStore.add(post.id)
    }
    else{
        likeStore.remove(post.id)
    }
}


</script>

<template>
    <div class="single-post">
        <img v-if="post.image" :src="post.image">
        <div class="text-content">
            <p class="author">{{ post.author }}</p>
            <p v-if="post.caption" class="caption-text">{{ post.caption }}</p>
        </div>
        <div class="footer">
            <div class="empty"></div>

            <div class="post-info">
                <div class="likes">
                    <HeartIcon @click="like(post)" :id=post.id />
                    <p class="like-text">{{ post.likes }}</p>
                </div>
                <div class="views">
                    <CommentIcon />
                </div>
            </div>

            <div class="time">
                {{ new Date(post.timestamp).toDateString() }}
            </div>
        </div>

    </div>
</template>

<style scoped>
.single-post{
    width: 100%;
    border: solid 1px var(--color-border);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    margin-bottom: 20px;
}

.single-post:hover{
    border-color: var(--color-border-hover);
}

img{
    margin-top: 15px;
    width: 80%;
    border: solid transparent;
    border-radius: 20px;
}

.caption-text{

    color: var(--color-text);
}

.footer{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 10px;
    /* border: solid 1px red; */
}

.post-info{
    width: 20%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: solid 1px blue; */
}

.time{
    width: 15%;

    font-size: 0.8rem;
    color: var(--color-text);

    /* border: solid 1px yellow; */
}

.empty{
    width: 15%;
    /* border: solid 1px green; */
}

.likes, .views{
    display: flex;
    place-items: center;
}

.like-text{
    margin-left: 5px;
}

.author{
    color: var(--color-heading);
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
}

.author:hover{
    cursor: pointer;
}

.text-content{
    margin-top: 15px;
    margin-bottom: 15px;
    width: 80%;
}


</style>