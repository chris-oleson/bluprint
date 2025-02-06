<template>
    <div class="full height section">
        <div v-if="loading" class="loading spinner"></div>
        <div v-else class="form">
            <h1 class="subtitle">Change Password</h1>
            <input v-if="!route.query.t" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Current password" v-model="currentPassword"/>
            <input type="password" class="big text field" :class="{'error': errorMessage}" placeholder="New password" v-model="newPassword" @keyup.enter="changePassword"/>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button class="big primary button" @click="changePassword">Submit</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import HTTP from '../utilities/http'
    import Store from '../utilities/store'
    import { useRouter, useRoute } from 'vue-router'
    const route = useRoute()
    const router = useRouter()
    const currentPassword = ref('')
    const newPassword = ref('')
    const loading = ref(false)
    const errorMessage = ref('')

    if (route.query.t) {
        Store.showSidebar = false
    }
    else {
        Store.showSidebar = true
    }

    async function changePassword() {
        try {
            loading.value = true
            await HTTP.patch('/auth/password', {
                token: route.query.t,
                currentPassword: currentPassword.value,
                newPassword: newPassword.value,
            })
            Store.notification = {
                text: "Successfully updated password",
                color: "var(--primary)"
            }
            if (route.query.t) {
                router.push('/sign-in')
            }
            else {
                router.push('/dashboard')
            }
        }
        catch (error) {
            errorMessage.value = error.message
            loading.value = false
        }
    }
</script>
