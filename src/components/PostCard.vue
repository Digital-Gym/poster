<script setup>
import HeartIcon from "../components/icons/Heart.vue"
import CommentIcon from "../components/icons/Comment.vue"

defineProps(['post'])
</script>

<template>
    <div class="single-post">
        <img v-if="post.image" :src="`images/${post.image}`">
        <p v-if="post.caption" class="caption-text">{{ post.caption }}</p>
        <div class="post-info">
            <div class="likes">
                <HeartIcon />
                <p>{{ post.likes }}</p>
            </div>
            <div class="views">
                <CommentIcon />
            </div>
        </div>
    </div>
</template>

<style scoped>
.single-post{
    border: solid 1px var(--color-border);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.single-post:hover{
    border-color: var(--color-border-hover);
}

img{
    width: 80%;
    border: solid transparent;
    border-radius: 20px;
}

.caption-text{
    margin-top: 15px;
    margin-bottom: 15px;
    width: 80%;
    color: var(--color-text);
}

.post-info{
    width: 33%;
    display: flex;
    justify-content: space-around;
}

.likes, .views{
    display: flex;
    place-items: center;
}
</style>