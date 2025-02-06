<template>
    <div class="full height section">
        <div class="form">
            <div v-if="loading" class="loading spinner"></div>

            <template v-else-if="accountCreated">
                <div>Your account has been created!</div>
                <div>We have sent you an email in order to verify your email address.</div>
                <div>Please verify your account before logging in.</div>
            </template>

            <template v-else>
                <input type="text" class="big text field" :class="{'error': errorMessage}" placeholder="Name" v-model="name"/>
                <input type="text" class="big text field" :class="{'error': errorMessage}" placeholder="Email" v-model="email"/>
                <input type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Password" v-model="password" @keyup.enter="createAccount"/>
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
                <button class="big primary button" @click="createAccount">Create Account</button>
                <router-link v-if="errorMessage == 'This email is already registered'" class="small simple button" :to="'/forgot-password?e=' + email">Forgot Password</router-link>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import HTTP from '../utilities/http'
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const accountCreated = ref(false)
    const loading = ref(false)
    import Store from '../utilities/store'
    Store.showSidebar = false

    async function createAccount() {
        try {
            loading.value = true
            await HTTP.post('/auth/create', {
                name: name.value,
                email: email.value,
                password: password.value,
            })
            accountCreated.value = true
        }
        catch(error) {
            errorMessage.value = error.message
        }

        loading.value = false
    }
</script>
