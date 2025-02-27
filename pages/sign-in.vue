<template>
<div class="full height section">
    <div v-if="loading" class="loading spinner"/>
    <div v-else-if="errorMessage && route.query.t" class="error">{{ errorMessage }}</div>
    <div v-else class="skinny form">
        <input v-model="email" type="text" class="big text field" :class="{'error': errorMessage}" placeholder="Email">
        <input v-model="password" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Password" @keyup.enter="login">
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button class="big primary button" @click="login">Sign In</button>
        <button v-if="errorMessage == 'This account has not been verified'" class="small simple button" @click="resend">Resend Verification</button>
        <nuxt-link class="small simple button" :to="'/forgot-password?e=' + email">Forgot Password</nuxt-link>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Sign In - bluprint' })
definePageMeta({ middleware: 'skip-if-authenticated' })
const route = useRoute()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const store = useStore()

async function login() {
    try {
        loading.value = true
        const response = await $fetch('/api/auth/login', { method: 'POST', body: {
            email: email.value,
            password: password.value,
        }})
        store.isLoggedIn = true
        store.theme = response.theme
        store.allowEmails = response.allow_emails == 1
        store.name = response.name
        store.subscriptionStatus = response.subscription_status
        store.notification = {
            text: "Welcome " + store.name,
            color: "var(--primary)"
        }
        navigateTo('/dashboard')
    }
    catch(error) {
        errorMessage.value = error.response ? error.response.statusText : error
        loading.value = false
    }
}

async function resend() {
    try {
        await $fetch('/api/auth/resend', { method: 'POST', body: {
            email: email.value,
        }})

        store.notification = {
            text: "Resent email verification",
            color: "var(--primary)"
        }
    }
    catch(error) {
        errorMessage.value = error.response ? error.response.statusText : error
    }
}
</script>
