<template>
    <div class="full height section">
        <div v-if="!success" class="form">
            <div>Request a password reset for the account linked to the email address below.</div>
            <input type="text" placeholder="Email" class="big text field" :class="{'error': errorMessage}" v-model="email" @keyup.enter="sendEmail"/>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button class="big primary button" @click="sendEmail">Send</button>
        </div>
        <div v-else>A password reset link has been sent to the entered email address.</div>
    </div>
</template>

<script setup>
    import HTTP from '../utilities/http'
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const email = ref(route.query.e)
    const errorMessage = ref('')
    const success = ref(false)
    import Store from '../utilities/store'
    Store.showSidebar = false

    async function sendEmail() {
        try {
            await HTTP.post('/auth/forgot', { email: email.value })
            errorMessage.value = ''
            success.value = true
        }
        catch(error) {
            errorMessage.value = error.message
        }
    }
</script>
