<template>
    <div class="full height section">
        <div class="form">
            <div v-if="loading" class="loading spinner"></div>
            <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import HTTP from '../utilities/http'
    import Store from '../utilities/store'
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const errorMessage = ref('')
    Store.showSidebar = false

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
            router.push('/dashboard')
        }
        catch(error) {
            errorMessage.value = error.message
            loading.value = false
        }
    }
</script>
