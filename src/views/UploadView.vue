<script setup>
import BackIcon from '../components/icons/Back.vue';

import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import axiosApiInstance from '@/api/api';
import {getUserEmail} from '@/utils/get'

const router = useRouter()
const authStore = useAuthStore()

const dbUrl = import.meta.env.VITE_APP_DB_URL
const storageBucket = import.meta.env.VITE_APP_STORAGE;

const warning = ref('')

const previewImage = ref(null)
const userFormData = reactive({
    photo: "",
    content: ""
})

let file = null;

// --- Upload logic ---
async function uploadImage(){
    try{
        const res = await axiosApiInstance.post(`https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/posts%2F${file.name}`, file, {
            headers: {
                'Content-Type': 'image/png'
            }
        })
        console.log("Img uploaded", res)
        return ` https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/posts%2F${file.name}?alt=media&token=${res.data.downloadTokens}`
    }
    catch(err){
        console.log(err)
    }
}

async function saveUserPost(postName){
    try{
        const res = await axiosApiInstance.post(`${dbUrl}/users/${authStore.userInfo.userId}.json`, {postName: postName})
        console.log("User saved ",res)
    }
    catch(err){
        console.log(err)
    }
}

async function upload(){
    warning.value = ''
    let imgURL = null
    
    if (file){
        if (file.size<9999999){
            imgURL = await uploadImage()
        }
        else{
            warning.value = 'Max size is 10MB'
            return
        }
    }
    const email = await getUserEmail()
    
    const postData = {
        author: email || "Anonymous",
        caption: userFormData.content,
        image: imgURL || '',
        likes: 0,
        timestamp: Date.now()
    };

    try{
        const res = await axiosApiInstance.post(`${dbUrl}/posts.json`, postData)
        console.log("Post published ", res)
        await saveUserPost(res.data.name)
        router.push({name: "home"})
    } 
    catch(err){
        console.log(err)
    }
}

// --- Image upload render ----
function saveImageToBuffer(event){
    try{
        if (event.srcElement.files[0]){
            file = event.srcElement.files[0]
            if (file.name.endsWith(".png") || file.name.endsWith(".jpg")){
                userFormData.photo = file
                previewUpdate() 
            }
        }
    }catch(err){
        console.log("Image was not found but we have")
    }
}

function previewUpdate(){
    previewImage.value = URL.createObjectURL(userFormData.photo)
}

function dragDrop(event){
    file = event.dataTransfer.files[0]
    if (file.name.endsWith(".png") || file.name.endsWith(".jpg")){
        userFormData.photo = file
        previewUpdate() 
    }
    previewUpdate()
}

</script>

<template>
    <div class="main">
        <BackIcon @click="router.back()"/>
        <div class="main-content">
            <div v-if="warning" class="alert-msg warn">{{ warning }}</div>
            <form @submit.prevent="upload" class="upload-form">
                <label 
                    @dragover.prevent 
                    @drop.prevent="dragDrop" 
                    class="drag-area" 
                    for="input-photo"
                >
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
                    required
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

    flex-direction: column;
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

.icon{
    position: fixed;
    top: 10%;
    right: 90%;
    width:50px;
}

.icon:hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: transform .3s ease;
}

.alert-msg{
    width: 70%;
    height: 5%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px var(--color-border);
    border-radius: 10px;
}

.warn{
    border-color: rgb(150, 0, 0);
    box-shadow: 0rem 0rem 1rem rgb(150, 0, 0) ;
}

</style>