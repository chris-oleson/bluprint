<template>
<div class="full height section">
    <div class="skinny form">
        <div v-if="loading" class="loading spinner"/>

        <template v-else-if="accountCreated">
            <div>Your account has been created!</div>
            <div>We have sent you an email in order to verify your email address.</div>
            <div>Please verify your account before logging in.</div>
        </template>

        <template v-else>
            <input v-model="name" type="text" class="big text field" :class="{'error': errorMessage}" placeholder="Name">
            <input v-model="email" type="text" class="big text field" :class="{'error': errorMessage}" placeholder="Email">
            <input v-model="password" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Password" @keyup.enter="createAccount">
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button class="big primary button" @click="createAccount">Create Account</button>
            <nuxt-link v-if="errorMessage == 'This email is already registered'" class="small simple button" :to="'/forgot-password?e=' + email">Forgot Password</nuxt-link>
        </template>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Sign Up - bluprint' })
definePageMeta({ middleware: 'skip-if-authenticated' })
const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const accountCreated = ref(false)
const loading = ref(false)

async function createAccount() {
    try {
        loading.value = true
        await $fetch('/api/auth/create', { method: 'POST', body: {
            name: name.value,
            email: email.value,
            password: password.value,
        }})
        accountCreated.value = true
    }
    catch(error) {
        if (error.response) {
            errorMessage.value = error.response.statusText
        }
    }

    loading.value = false
}
</script>
