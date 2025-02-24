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
        <nuxt-link class="border button" to="/change-name">Change Name</nuxt-link>
        <nuxt-link class="border button" to="/change-email">Change Email</nuxt-link>
        <nuxt-link class="border button" to="/change-password">Change Password</nuxt-link>
        <nuxt-link class="border error button" to="/delete-account">Delete Account</nuxt-link>

        <div>Subscription: {{ store.subscriptionStatus == "active" ? "Active" : "Free" }}</div>
        <a v-if="store.subscriptionStatus == 'active'" class="border button" href="https://billing.stripe.com/p/login/fZe16Ng0E4svc2Q6oo">Manage Subscription</a>
        <nuxt-link v-else class="primary button" to="/pricing">Upgrade</nuxt-link>

        <label class="label">
            Send me updates and promotions
            <input v-model="store.allowEmails" type="checkbox" class="checkbox" @change="savePreferences()">
        </label>
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

function updateTheme(theme) {
    store.theme = theme
    savePreferences()
}

function savePreferences() {
    $fetch('/api/auth/preferences', { method: 'PATCH', body: {
        theme: store.theme,
        allowEmails: store.allowEmails
    }})
}
</script>
