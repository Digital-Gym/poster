<script setup>
import {ref, onMounted} from "vue"
import { useLikeStore } from "@/stores/likes";

const props = defineProps(['id'])

const likeStore = useLikeStore()
const likeClicked = ref(false)
const isLiked = ref(false)


onMounted(()=>{
    isLiked.value = likeStore.isLiked(props.id)
})

</script>

<template>
    <svg 
        @click="likeClicked = !likeClicked; isLiked = !isLiked"
        :class="{animate: likeClicked, fill: isLiked}"
         xmlns="http://www.w3.org/2000/svg" 
         fill="currentColor" class="bi bi-heart"
         viewBox="0 0 16 16"
        > 
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/> 
    </svg>
</template>

<style scoped>
.bi{
    fill: var(--color-text);
    width: 24px;
    height: 24px;
}


.bi:hover{
    fill: var(--color-heading);
}

@keyframes flipFlop {
    0%{
        transform: 0;
    } 
    40%{
        transform: rotate(45deg);
    }
    60%{
        transform: rotate(-45deg);
    }
    100%{
        transform: 0;
    }
}
.animate:hover{
    fill: rgb(175, 1, 1);
}

.animate{
    animation: flipFlop 1s;
    
}
.fill{
    fill: rgb(175, 1, 1);
}
</style>