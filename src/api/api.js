import axios from "axios";
import { useAuthStore } from "@/stores/auth";

import router from '../router'

const axiosApiInstance = axios.create()
const apiKey = import.meta.env.VITE_APP_API_KEY;

// on request (home)
axiosApiInstance.interceptors.request.use((config) => {
    const url = config.url

    if(!url.includes('signUp') && !url.includes('signInWithPassword')){
        const authStore = useAuthStore()
        let params = new URLSearchParams()
        params.append('auth', authStore.userInfo.token)
        
        config.params = params
    }
    return config
})

// on response
axiosApiInstance.interceptors.response.use((response)=>{
    return response
}, 
async function(error){
    const authStore = useAuthStore()
    const originalRequest = error.config

    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true
        try{
            const newTokens = await axios.post(
                `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
                {
                    grant_type: "refresh_token",
                    refresh_token: JSON.parse(localStorage.getItem('userInfo')).refreshToken
                }
            )
            authStore.userInfo.token = newTokens.data.access_token
            authStore.userInfo.refreshToken = newTokens.data.refresh_token
            authStore.userInfo.expiresIn = newTokens.data.expires_in

            localStorage.setItem('userInfo', JSON.stringify({
                token: newTokens.data.access_token, 
                refreshToken: newTokens.data.refresh_token,
                expiresIn: newTokens.data.expires_in
            }))
        }
        catch(err){
            console.log(err)
            router.push({name: "login"})

            authStore.userInfo.token = ''
            authStore.userInfo.refreshToken = ''
            localStorage.removeItem('userInfo')
        }
    }
})

export default axiosApiInstance