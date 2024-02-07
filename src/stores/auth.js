import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from 'axios'

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

    const signup = async (payload) => {
        error.value = '';
        loader.value = true;
        try{
            let res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,{
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
                default:
                    error.value = 'Smth went wrong'
                    break;
            }
        }
        finally{
            loader.value = false;
        }
    }
    return { signup, userInfo, error, loader}
});