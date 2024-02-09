<script setup>
import {ref, computed} from 'vue'
import {useAuthStore} from "../stores/auth"
import { useRouter } from 'vue-router';

// -- register requests --
const authStore = useAuthStore()
const router = useRouter()

const signup = async () => {
    await authStore.auth({email: email.value, password: password.value}, 'register')
    router.push({name: "home"})
}


//  -- form data --
const name = ref(null)
const email = ref(null)

const password = ref(null)
const confirm_pass = ref(null)

const isValid = computed(()=>{
    if (password.value && confirm_pass.value && name.value && email.value){
        if (password.value == confirm_pass.value && 
            password.value.length > 5 && name.value.length>2 && 
            email.value.length>3 && email.value.includes("@")
            ){
            return true
        }
    }
    return false
})

authStore.error = ''

</script>

<template>
    <div class="main">
        <div class="main-content">
            <TransitionGroup>
            <h1 class="h1-text" key="header">Register</h1>
            <div v-if="authStore.error" class="alert-msg warn" :key=authStore.error>
                {{ authStore.error }}
            </div>
            <form @submit.prevent="signup" class="form-field" key="form">
                <div class="field-card">
                    <input v-model="name" type="text" id="name" required placeholder="Your name" minlength="3" maxlength="12">
                    <input v-model="email" type="email" id="mail" required placeholder="Your email" minlength="4" maxlength="50">

                    <input v-model="password" type="password" id="pw-field-1" required placeholder="Password" minlength="6" maxlength="30">
                    <input v-model="confirm_pass" type="password" id="pw-field-2" required placeholder="Confrim password" minlength="6"  maxlength="30">
                </div>
                <p v-if="authStore.loader">Processing...</p>
                <button v-else :class="{'btn-upload': isValid}" class="btn">Register</button>
            </form>
            <div key="ftr-msg" class="already-msg">Already have an account? <RouterLink class="link" :to="{name: 'login'}">Login</RouterLink></div>
        </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.main{
    display: flex;
    align-items: center;
    justify-content: center; 

    /* border: solid 1px blue; */
    height: 100dvh;
}
.main-content{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    /* border: solid 1px red; */
    width: 30%;
    height: 80%;
}

.form-field{
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    width: 70%;
    height: 70%;
    border: solid 1px var(--color-border);
    border-radius: 10px;
}

.field-card input{
    background-color: transparent;
    border: solid 1px var(--color-border);
    border-radius: 10px;
    height: 17%;
    color: var(--color-text);
    padding-left: 10px;
}


.field-card input:-webkit-autofill,
.field-card input:-webkit-autofill:hover, 
.field-card input:-webkit-autofill:focus{
  -webkit-text-fill-color: var(--color-text);
  -webkit-box-shadow: 0 0 0px 1000px var(--color-background-muted) inset;
  transition: background-color 5000s ease-in-out 0s;
}

.field-card{
    /* border: solid 1px yellow; */
    width: 80%;
    height: 60% ;

    display: flex;
    justify-content: space-around;
    flex-direction: column;
    /* overflow: hidden; */
    color: var(--color-text);
}

.h1-text{
    margin-bottom: 25px;
    color: var(--color-heading);
    font-weight: bold;
}
.btn{
    width: 20%;
    height: 6%;
    border: solid 1px var(--color-border);
    border-radius: 10px;
    background-color: transparent;
    color: var(--color-background-muted);
}

.btn-upload{
    border: solid 1px rgb(0, 177, 6);
    border-radius: 10px;
    color: var(--color-heading);
}

.btn-upload:hover{
    box-shadow: 0rem 0rem 1rem rgb(0, 181, 60);
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

.v-move, /* apply transition to moving elements */
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.already-msg{
    margin-top: 10px;
    color: var(--color-text);
}

.link{
    text-decoration: none;
    color: rgb(56, 205, 255);
}
</style>