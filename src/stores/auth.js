import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from 'axios'

const apiKey = import.meta.env.VITE_APP_API_KEY;


export const useAuthStore = defineStore('auth', ()=>{
    const signup = async (payload) => {
        try{
            let res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,{
                ...payload,
                returnSecureToken: true
            });
            console.log(res.data);
        } catch(err){
            console.log(err.response);
        }
    }
    return { signup }
})
