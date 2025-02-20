<template>
    <div class="full height section">
        <div v-if="loading" class="loading spinner"/>
        <div v-else class="form">
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
    const router = useRouter()
    const currentPassword = ref('')
    const newPassword = ref('')
    const loading = ref(false)
    const errorMessage = ref('')

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
