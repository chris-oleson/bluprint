<template>
    <div class="full height section">
        <div v-if="loading" class="loading spinner"></div>
        <template v-else-if="sentVerification">
            <div>We have sent you an email in order to verify your new email address.</div>
            <div>You must verify your new email before your account is updated.</div>
        </template>
        <div v-else class="form">
            <h1 class="subtitle">Change Email</h1>
            <input type="text" class="big text field" :class="{'error': errorMessage}" placeholder="New email" v-model="newEmail"/>
            <input type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Password" v-model="password" @keyup.enter="changeEmail"/>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button class="big primary button" @click="changeEmail">Submit</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import HTTP from '../utilities/http'
    import Store from '../utilities/store'
    const password = ref('')
    const newEmail = ref('')
    const errorMessage = ref('')
    const sentVerification = ref(false)
    const loading = ref(false)
    Store.showSidebar = true

    async function changeEmail () {
        try {
            loading.value = true
            await HTTP.patch('/auth/email', {
                password: password.value,
                newEmail: newEmail.value,
            })
            sentVerification.value = true
        }
        catch(error) {
            errorMessage.value = error.message
        }

        loading.value = false
    }
</script>
