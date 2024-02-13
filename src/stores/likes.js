import {defineStore} from 'pinia'


export const useLikeStore = defineStore('likes', ()=>{
    let likedPosts = []

    const add = (id) => {
        console.log('ADDED')

        likedPosts.push(id)
        localStorage.setItem('likes', JSON.stringify({
            likedPosts
        }))
    }

    const remove = (id) => {
        console.log('REMOVED')

        const index = likedPosts.indexOf(id)
        likedPosts.splice(index, 1)

        localStorage.setItem('likes', JSON.stringify({
            likedPosts
        }))
    }

    function isLiked(id){
        let storage = localStorage.getItem('likes')

        if (likedPosts.length==0 && storage){
            console.log('obtained from storage')
            likedPosts = JSON.parse(storage).likedPosts
        }

        for (let i=0; i<likedPosts.length;i++){
            if (likedPosts[i] == id){
                return true
            }
        }
        return false
    }

    return {likedPosts, add, isLiked, remove}
})