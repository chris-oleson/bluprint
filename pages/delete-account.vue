<template>
<div class="full height section">
    <div v-if="loading" class="loading spinner"/>
    <div v-else class="skinny form">
        <h1 class="subtitle">Delete Account</h1>
        <input v-model="password" type="password" class="big text field" :class="{'error': errorMessage}" placeholder="Password" @keyup.enter="deleteAccount">
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button class="big primary error button" @click="deleteAccount">Delete Account</button>
        <div>Deleting your account will also cancel any active subscriptions</div>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Delete Account - bluprint' })
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const store = useStore()

async function deleteAccount () {
    try {
        loading.value = true
        await HTTP.delete('/auth', { password: password.value })
        store.$reset()
        // store.notification = {
        //     text: "Successfully deleted account",
        //     color: "var(--primary)"
        // }
        navigateTo('/')
    }
    catch(error) {
        loading.value = false
        errorMessage.value = error.message
    }
}
</script>
