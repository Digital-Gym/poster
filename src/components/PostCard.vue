<script setup>
import HeartIcon from "../components/icons/Heart.vue"
import CommentIcon from "../components/icons/Comment.vue"

defineProps(['post'])
</script>

<template>
    <div class="single-post">
        <img v-if="post.image" :src="post.image">
        <div class="text-content">
            <p class="author">{{ post.author }}</p>
            <p v-if="post.caption" class="caption-text">{{ post.caption }}</p>
        </div>
        <div class="post-info">
            <div class="likes">
                <HeartIcon />
                <p class="like-text">{{ post.likes }}</p>
            </div>
            <div class="views">
                <CommentIcon />
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

.post-info{
    width: 33%;
    display: flex;
    justify-content: space-around;
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