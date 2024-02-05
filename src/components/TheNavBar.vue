<template>
    <nav>
        <button class="submenu">=</button>
        <div></div>
        <RouterLink class='btn_upload' :to="{name: 'upload'}">Upload</RouterLink>
    </nav>
</template>

<style scoped>
nav{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;

    /* border: solid 1px red; */
}
.btn_upload{
    text-decoration: none;
    color: var(--color-heading);
    margin-right: 40px;

    border: solid 1px rgb(0, 102, 255);
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
}

.btn_upload:hover{
    border-color: rgb(70, 144, 255); 
}

.btn_upload:active{
    border-color: rgb(141, 187, 255); 
}

.submenu{
    margin-left: 40px;
    background-color: transparent;
    color: var(--color-heading);
    border: solid transparent;
    font-size: 2rem;
}

.submenu:hover{
    cursor: pointer;
    color: var(--color-text);
}
</style>