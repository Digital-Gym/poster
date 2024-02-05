<script setup>
import HeartIcon from "../components/icons/Heart.vue"
import ViewIcon from "../components/icons/Views.vue"

defineProps(['post'])
</script>

<template>
    <div class="single-post">
        <img v-if="post.image" :src="post.image">
        <p v-if="post.caption" class="caption-text">{{ post.caption }}</p>
        <div class="post-info">
            <div class="likes">
                <HeartIcon />
                <p>{{ post.likes }}</p>
            </div>
            <div class="views">
                <ViewIcon />
                <p>{{ post.views }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.single-post{
    border: solid 1px red;
}

img{
    width: 70%;
}
</style>