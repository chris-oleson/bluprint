<template>
<div class="full height section">
    <div v-if="loading" class="loading spinner"/>
    <div v-else class="skinny form">
        <h2>Change Password</h2>
        <input v-if="!route.query.t" v-model="currentPassword" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Current password">
        <input v-model="newPassword" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="New password" @keyup.enter="changePassword">
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button class="big primary button" @click="changePassword">Submit</button>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Change Password - bluprint' })
definePageMeta({
    middleware: 'require-authentication',
    layout: 'app-layout',
})
const route = useRoute()
const currentPassword = ref('')
const newPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const store = useStore()

async function changePassword() {
    try {
        loading.value = true
        await $fetch('/api/user/password', { method: 'PATCH', body: {
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
        }})
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
