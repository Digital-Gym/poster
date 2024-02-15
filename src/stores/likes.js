import {defineStore} from 'pinia'
import axiosApiInstance from '@/api/api'
import { useAuthStore } from '@/stores/auth';

const dbUrl = import.meta.env.VITE_APP_DB_URL

export const useLikeStore = defineStore('likes', ()=>{
    let likedPosts = []

    const dbPush = async (postName, i) => {
        try{
            await axiosApiInstance.patch(`${dbUrl}/posts/${postName}.json`, {"likes": {".sv": {"increment": i}}})
        }
        catch(err){
            console.log(err)
        }
    }

    function fillLocal(){
        let temp = []
        try{
            temp = JSON.parse(localStorage.getItem('likes')).likedPosts
        }
        catch{
            temp = []
        }
        return temp
    }

    const localPush = (id) => {
        likedPosts = fillLocal()
        likedPosts.push(id)

        localStorage.setItem('likes', JSON.stringify({
            likedPosts
        }))
    }

    const localRemove = (id) => {
        likedPosts = fillLocal()

        const index = likedPosts.indexOf(id)
        likedPosts.splice(index, 1)

        localStorage.setItem('likes', JSON.stringify({
            likedPosts
        }))
    }

    async function like(postName, id){
        console.log("like")
        const authStore = useAuthStore()

        await dbPush(postName, 1)
        localPush(id)
        const res = await axiosApiInstance.put(`${dbUrl}/info/${authStore.userInfo.userId}/likes.json`, likedPosts)
        
        return res
    }

    async function dislike(postName, id){
        console.log("dis")
        const authStore = useAuthStore()

        await dbPush(postName, -1)
        localRemove(id)
        const res = await axiosApiInstance.put(`${dbUrl}/info/${authStore.userInfo.userId}/likes.json`, likedPosts)
        
        return res
    }

    async function update(id, postName){
        if (isLiked(id)){
            await dislike(postName, id)
            return
        }

        try{
            const authStore = useAuthStore()
            const res = await axiosApiInstance.get(`${dbUrl}/info/${authStore.userInfo.userId}.json`)

            const secondKey = Object.keys(res.data)[1];
            
            if (!secondKey){
                await like(postName, id)
                return
            }

            const likes = res.data[secondKey];
            const dbArray = likes[Object.keys(likes)[0]]

            if (![dbArray].includes(id)){
                await like(postName, id)
            }
            else{
                await dislike(postName, id)
            }
        }
        catch(err){
            console.log(err)
        }
    }


    function isLiked(id){
        let storage = localStorage.getItem('likes')

        if (likedPosts.length==0 && storage){
            likedPosts = JSON.parse(storage).likedPosts
        }

        for (let i=0; i<likedPosts.length;i++){
            if (likedPosts[i] == id){
                return true
            }
        }
        return false
    }

    return {likedPosts, update, isLiked}
})