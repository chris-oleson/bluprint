<template>
<div class="full height section">
    <div v-if="loading" class="loading spinner"/>
    <template v-else-if="sentVerification">
        <div>We have sent you an email in order to verify your new email address.</div>
        <div>You must verify your new email before your account is updated.</div>
    </template>
    <div v-else class="skinny form">
        <h2>Change Email</h2>
        <input v-model="newEmail" type="text" class="big text field" :class="{'error': errorMessage}" placeholder="New email">
        <input v-model="password" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Password" @keyup.enter="changeEmail">
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button class="big primary button" @click="changeEmail">Submit</button>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Change Email - bluprint' })
definePageMeta({
    middleware: 'require-authentication',
    layout: 'app-layout',
})
const password = ref('')
const newEmail = ref('')
const errorMessage = ref('')
const sentVerification = ref(false)
const loading = ref(false)

async function changeEmail () {
    try {
        loading.value = true
        await $fetch('/api/auth/email', { method: 'PATCH', body: {
            password: password.value,
            newEmail: newEmail.value,
        }})
        sentVerification.value = true
    }
    catch(error) {
        errorMessage.value = error.response ? error.response.statusText : error
    }

    loading.value = false
}
</script>
