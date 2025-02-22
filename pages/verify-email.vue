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

verify()

async function verify() {
    loading.value = true

    try {
        const response = await HTTP.post('/auth/verify', {
            token: route.query.t,
            email: route.query.e
        })
        await Store.getAllAssetData()
        Store.name = response.name
        Store.isLoggedIn = true
        Store.notification = {
            text: "Successfully verified email!",
            color: "var(--primary)"
        }
        navigateTo('/dashboard')
    }
    catch(error) {
        errorMessage.value = error.message
        loading.value = false
    }
}
</script>
