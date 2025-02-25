<template>
<div class="full height section">
    <div v-if="loading" class="loading spinner"/>
    <div v-else class="skinny form">
        <h1 class="subtitle">Change Name</h1>
        <div style="text-align: start;">Current name: {{ store.name }}</div>
        <input v-model="newName" type="text" class="big text field" :class="{'error': errorMessage}" placeholder="New name" @keyup.enter="changeName">
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button class="big primary button" @click="changeName">Submit</button>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Change Name - bluprint' })
definePageMeta({
    middleware: 'require-authentication',
    layout: 'app-layout',
})
const store = useStore()
const newName = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function changeName () {
    try {
        loading.value = true
        await $fetch('/api/auth/name', { method: 'PATCH', body: {
            newName: newName.value,
        }})
        loading.value = false
        store.name = newName.value
        store.notification = {
            text: "Updated name to " + newName.value,
            color: "var(--primary)"
        }
        navigateTo('/dashboard')
    }
    catch(error) {
        if (error.response) {
            errorMessage.value = error.response.statusText
        }
    }

    loading.value = false
}
</script>
