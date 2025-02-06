<template>
    <div class="full height section">
        <div v-if="loading" class="loading spinner"></div>
        <div v-else class="form">
            <h1 class="subtitle">Change Name</h1>
            <div style="text-align: start;">Current name: {{ Store.name }}</div>
            <input type="text" class="big text field" :class="{'error': errorMessage}" placeholder="New name" v-model="newName" @keyup.enter="changeName"/>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button class="big primary button" @click="changeName">Submit</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import HTTP from '../utilities/http'
    import Store from '../utilities/store'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const newName = ref('')
    const errorMessage = ref('')
    const loading = ref(false)
    Store.showSidebar = true

    async function changeName () {
        try {
            loading.value = true
            await HTTP.patch('/auth/name', {
                newName: newName.value,
            })
            loading.value = false
            Store.name = newName.value
            Store.notification = {
                text: "Updated name to " + newName.value,
                color: "var(--primary)"
            }
            router.push('/dashboard')
        }
        catch(error) {
            errorMessage.value = error.message
        }

        loading.value = false
    }
</script>
