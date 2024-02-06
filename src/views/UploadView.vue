<script setup>
import { reactive, ref } from 'vue';

const previewImage = ref(null)

const userFormData = reactive({
    photo: "",
    content: ""
})

function saveImageToBuffer(event){
    userFormData.photo = event.srcElement.files[0]
    previewUpdate()
}

function previewUpdate(){
    previewImage.value = URL.createObjectURL(userFormData.photo)
}

function dragDrop(event){
    userFormData.photo = event.dataTransfer.files[0]
    previewUpdate()
}

</script>

<template>
    <div class="main">
        <div class="main-content">
            <form class="upload-form">
                <label @dragover.prevent @drop.prevent="dragDrop" class="drag-area" for="input-photo">
                    <input 
                        @change="saveImageToBuffer" 
                        type="file" accept="image/png, image/jpeg" 
                        id="input-photo" hidden
                        >
                    <div class="preview-container">
                        <img 
                            v-if="userFormData.photo.name" 
                            :src="previewImage"
                            class="preview-img"
                            >
                        <div v-else class="preview-no-image">
                            <h2>Upload a photo</h2>
                            <p>Drag and drop your photo or just click this area</p>
                        </div>
                    </div>
                </label>
                
                <textarea 
                    class="text-input" 
                    v-model="userFormData.content" 
                    placeholder="Write a caption.."
                ></textarea>
                <button class="btn-upload">Upload</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.main{
    width: 100%;
    height: 100dvh;

    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    /* border: solid 1px blue; */
}

.main-content{
    width: 50%;
    height: 80%;
    /* border: solid 1px red; */

    display: flex;
    justify-content: center;
    align-items: center;
}

.upload-form{
    width: 80%;
    height: 80%;

    /* border: solid 1px yellow; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.drag-area{
    width: 90%;
    height: 60%;
    border: solid 2px var(--color-border);
    border-radius: 15px;

    overflow: hidden;
}
.drag-area:hover{
    cursor: pointer;
    border-color: var(--color-border-hover);
    transition: all .3s ease;
    background-color: var(--color-background-soft);
}

.preview-container{
    overflow: hidden;
    background-color: var(--color-background-muted);
    height: 100%;
    width:100%;

    display: flex;
    place-items: center;
    place-content: center;
    flex-direction: column;
}

.preview-img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}


.preview-no-image{
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-around;
    flex-direction: column;
    /* border: solid 1px yellow; */
}

.text-input{
    background-color: var(--color-background-muted);
    border: solid 1px var(--color-border);
    border-radius: 10px;

    width: 90%;
    height: 15%;

    color: var(--color-text);
    padding-left: 10px;
    padding-top: 10px;
    font-size: 1rem;
    resize: none;

    scrollbar-width: none;
}

.text-input:hover{
    border-color: var(--color-border-hover);
    transition: all .3s ease;
}

.btn-upload{
    width: 20%;
    height: 6%;
    border: solid 1px rgb(0, 177, 6);
    border-radius: 10px;
    background-color: transparent;
    color: var(--color-heading);
}

.btn-upload:hover{
    box-shadow: 0rem 0rem 1rem rgb(0, 181, 60);
    transition: all .5s ease;
}

</style>