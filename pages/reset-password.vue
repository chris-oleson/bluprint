<template>
<div class="full height section">
    <div v-if="loading" class="loading spinner"/>
    <div v-else class="skinny form">
        <h2>Change Password</h2>
        <input v-model="newPassword" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="New password" @keyup.enter="resetPassword">
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button class="big primary button" @click="resetPassword()">Submit</button>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Reset Password - bluprint' })
const route = useRoute()
const errorMessage = ref('')
const newPassword = ref('')
const loading = ref(false)
const store = useStore()

async function resetPassword() {
    try {
        loading.value = true
        const response = await $fetch('/api/auth/password', { method: 'PATCH', body: {
            token: route.query.t ?? '',
            newPassword: newPassword.value,
        }})
        store.isLoggedIn = true
        store.theme = response.theme
        store.allowEmails = response.allow_emails == 1
        store.name = response.name
        store.subscriptionStatus = response.subscription_status
        store.notification = {
            text: "Successfully updated password",
            color: "var(--primary)"
        }
        navigateTo('/dashboard')
    }
    catch (error) {
        errorMessage.value = error.response ? error.response.statusText : error
        loading.value = false
    }
}
</script>
