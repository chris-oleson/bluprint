<template>
<div class="full height section">
    <div class="skinny form">
        <div>Appearance</div>
        <div class="horizontal button group">
            <button class="border button" :class="{'selected': store.theme == 'system'}" @click="updateTheme('system')">System</button>
            <button class="border button" :class="{'selected': store.theme == 'light'}" @click="updateTheme('light')">Light</button>
            <button class="border button" :class="{'selected': store.theme == 'dark'}" @click="updateTheme('dark')">Dark</button>
        </div>

        <div>Account</div>
        <NuxtLink class="border button" to="/change-name">Change Name</NuxtLink>
        <NuxtLink class="border button" to="/change-email">Change Email</NuxtLink>
        <NuxtLink class="border button" to="/change-password">Change Password</NuxtLink>
        <button class="border error button" @click="showHistoryDialog = true">Delete Historic Data</button>
        <NuxtLink class="border error button" to="/delete-account">Delete Account</NuxtLink>

        <div>Subscription: {{ store.subscriptionStatus == "active" ? "Active" : "Free" }}</div>
        <a v-if="store.subscriptionStatus == 'active'" class="border button" href="https://billing.stripe.com/p/login/fZe16Ng0E4svc2Q6oo">Manage Subscription</a>
        <NuxtLink v-else class="primary button" to="/pricing">Upgrade</NuxtLink>

        <label class="label">
            Send me updates and promotions
            <input v-model="store.allowEmails" type="checkbox" class="checkbox" @change="savePreferences()">
        </label>
    </div>

    <div v-if="showHistoryDialog" class="dialog" @click.self.stop="showHistoryDialog = false">
        <div class="skinny form card">
            <div>Are you sure you want to delete all historic value data on your account? This action cannot be undone.</div>
            <button class="primary error button" @click="deleteHistory()">Yes</button>
            <button class="simple button" @click="showHistoryDialog = false">Cancel</button>
        </div>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Settings - bluprint' })
definePageMeta({
    middleware: 'require-authentication',
    layout: 'app-layout',
})
const store = useStore()
const colorMode = useColorMode()
const showHistoryDialog = ref(false)

function updateTheme(theme) {
    store.theme = theme
    colorMode.preference = theme
    savePreferences()
}

async function deleteHistory() {
    await HTTP.delete('/api/items/history')
    showHistoryDialog.value = false
    store.getAllAssetData()
    store.notification = {
        text: "Successfully deleted history",
        color: "var(--primary)"
    }
}

function savePreferences() {
    $fetch('/api/auth/preferences', {
        method: 'PATCH',
        body: {
            theme: colorMode.preference,
            allowEmails: store.allowEmails
        }
    })
}
</script>
