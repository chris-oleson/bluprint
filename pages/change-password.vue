<template>
    <div class="full height section">
        <div v-if="loading" class="loading spinner"/>
        <div v-else class="skinny form">
            <h1 class="subtitle">Change Password</h1>
            <input v-if="!route.query.t" v-model="currentPassword" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Current password">
            <input v-model="newPassword" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="New password" @keyup.enter="changePassword">
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button class="big primary button" @click="changePassword">Submit</button>
        </div>
    </div>
</template>

<script setup>
    useHead ({ title: 'Change Password - bluprint' })

    const route = useRoute()
    const currentPassword = ref('')
    const newPassword = ref('')
    const loading = ref(false)
    const errorMessage = ref('')

    async function changePassword() {
        try {
            loading.value = true
            await $fetch('/api/auth/password', { method: 'PATCH', body: {
                token: route.query.t,
                currentPassword: currentPassword.value,
                newPassword: newPassword.value,
            }})
            store.notification = {
                text: "Successfully updated password",
                color: "var(--primary)"
            }
            if (route.query.t) {
                navigateTo('/sign-in')
            }
            else {
                navigateTo('/dashboard')
            }
        }
        catch (error) {
            if (error.response) {
                errorMessage.value = error.response.statusText
            }
            loading.value = false
        }
    }
</script>
