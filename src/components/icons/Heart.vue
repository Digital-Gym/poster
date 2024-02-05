<template>
    <button>
        <img class="icon" src="/images/heart.png">
    </button>

</template>

<style scoped>
.icon{
    filter: brightness(0) invert(1);
    width: 24px;
}

button{
    background-color: transparent;
    border: solid transparent;
}

button:hover .icon{
    filter: brightness(0) invert(0.2) sepia(100%) saturate(1000%) hue-rotate(0deg);
}
</style>