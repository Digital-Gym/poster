import {ref} from 'vue'
import {defineStore} from 'pinia'

import axiosApiInstance from '../api/api'

const apiKey = import.meta.env.VITE_APP_API_KEY;

const error = ref('');
const loader = ref(false);

export const useAuthStore = defineStore('auth', ()=>{
    const userInfo = ref({
        token: '',
        email: '',
        userId: '',
        refreshToken: '',
        expiresIn: ''
    });

    const auth = async (payload, type) => {
        error.value = '';
        loader.value = true;
        const urlType = type === "register" ? "signUp" : "signInWithPassword";
        try{
            let res = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${urlType}?key=${apiKey}`,{
                ...payload,
                returnSecureToken: true
            });
            userInfo.value = {
                token: res.data.idToken,
                email: res.data.email,
                userId: res.data.localId,
                refreshToken: res.data.refreshToken,
                expiresIn: res.data.expiresIn
            }
            localStorage.setItem('userInfo', JSON.stringify({
                token: userInfo.value.token, 
                refreshToken: userInfo.value.refreshToken,
                expiresIn: userInfo.value.expiresIn
            }))
        } 
        catch(err){
            switch (err.response.data.error.message){
                case 'EMAIL_EXISTS':
                    error.value = 'Email already exists, login or try another email'
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    error.value = 'Operation not allowed :/'
                    break;
                case 'Too_MANY_ATTEMPTS_TRY_LATER':
                    error.value = 'Too many attempts! Try later'
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                    error.value = 'Your email or password is incorrect'
                    break;
                case 'USER_DISABLED':
                    error.value = 'You were banned (ha-ha-ha)'
                    break;
                default:
                    error.value = 'Smth went wrong'
                    break;
            }
            throw error.value;
        }
        finally{
            loader.value = false;
        }
    }
    return { auth, userInfo, error, loader}
});