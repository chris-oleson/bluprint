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
            <NuxtLink class="small simple button" :to="'/forgot-password?e=' + email">Forgot Password</NuxtLink>
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
    const colorMode = useColorMode()

    async function login() {
        try {
            loading.value = true
            const { response } = await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value,
                }
            })
            store.isLoggedIn = true
            colorMode.preference = response.theme
            // store.allowEmails = response.allow_emails == 1
            // store.subscriptionStatus = response.subscription_status
            // store.name = response.name
            // store.notification = {
            //     text: "Welcome " + store.name,
            //     color: "var(--primary)"
            // }
            navigateTo('/dashboard')
        }
        catch(error) {
            if (error.response) {
                errorMessage.value = error.response.statusText
            }
            loading.value = false
        }
    }

    async function resend() {
        try {
            await $fetch('/api/auth/resend', {
                method: 'POST',
                body: {
                    email: email.value,
                }
            })

            await axios.post('/auth/resend', { email: email.value })
            store.notification = {
                text: "Resent email verification",
                color: "var(--primary)"
            }
        }
        catch(error) {
            if (error.response) {
                errorMessage.value = error.response.statusText
            }
        }
    }
</script>
