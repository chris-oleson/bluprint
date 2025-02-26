<template>
<div class="full height section">
    <div class="form">
        <div v-if="loading" class="loading spinner"/>
        <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Verify Email - bluprint' })
const route = useRoute()
const loading = ref(false)
const errorMessage = ref('')
const store = useStore()

verify()

async function verify() {
    loading.value = true

    try {
        const response = await $fetch('/api/auth/verify', { method: 'POST', body: {
            token: route.query.t,
            email: route.query.e
        }})
        store.isLoggedIn = true
        store.theme = response.theme
        store.allowEmails = response.allow_emails == 1
        store.name = response.name
        store.subscriptionStatus = response.subscription_status
        store.notification = {
            text: "Successfully verified email!",
            color: "var(--primary)"
        }
        navigateTo('/dashboard')
    }
    catch(error) {
        if (error.response) {
            errorMessage.value = error.response.statusText
        }
        loading.value = false
    }
}
</script>
