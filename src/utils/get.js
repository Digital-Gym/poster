import { useAuthStore } from '@/stores/auth';
import axiosApiInstance from '@/api/api';


const dbUrl = import.meta.env.VITE_APP_DB_URL

export async function getUserEmail(){
    try{
        const authStore = useAuthStore()
        const res = await axiosApiInstance.get(`${dbUrl}/info/${authStore.userInfo.userId}.json`)

        const firstKey = Object.keys(res.data)[0];
        const email = res.data[firstKey].email;

        return email;
    }
    catch(err){
        console.log(err)
    }
}
