<template>
    <div class="full height section">
        <div v-if="loading" class="loading spinner"></div>
        <div v-else-if="errorMessage && route.query.t" class="error">{{ errorMessage }}</div>
        <div v-else class="form">
            <input type="text" class="big text field" :class="{'error': errorMessage}" placeholder="Email" v-model="email"/>
            <input type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Password" v-model="password" @keyup.enter="login"/>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button class="big primary button" @click="login">Sign In</button>
            <button v-if="errorMessage == 'This account has not been verified'" class="simple button" @click="resend">Resend Verification</button>
            <router-link class="small simple button" :to="'/forgot-password?e=' + email">Forgot Password</router-link>
        </div>
    </div>
</template>

<script setup>
    import HTTP from '../utilities/http'
    import { ref } from 'vue'
    import Store from '../utilities/store'
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const loading = ref(false)
    Store.showSidebar = false

    async function login() {
        try {
            loading.value = true
            const response = await HTTP.post('/auth/login', {
                email: email.value,
                password: password.value,
            })
            Store.currency = response.currency
            Store.itemsPerPage = response.items_per_page
            Store.allowEmails = response.allow_emails == 1
            Store.theme = response.theme
            Store.subscriptionStatus = response.subscription_status
            Store.reauthenticate = response.reauthenticate
            Store.name = response.name
            Store.isLoggedIn = true
            Store.notification = {
                text: "Welcome " + Store.name,
                color: "var(--primary)"
            }
            router.push('/dashboard')
        }
        catch(error) {
            errorMessage.value = error.message
            loading.value = false
        }
    }

    async function resend() {
        try {
            await HTTP.post('/auth/resend', { email: email.value })
            Store.notification = {
                text: "Resent email verification",
                color: "var(--primary)"
            }
        }
        catch(error) {
            errorMessage.value = error.message
        }
    }
</script>
