<template>
    <div class="full height section">
        <div class="form">
            <div>Appearance</div>
            <div class="radio">
                <button class="border button" :class="{'selected': Store.theme == 'system'}" @click="updateTheme('system')">System</button>
                <button class="border button" :class="{'selected': Store.theme == 'light'}" @click="updateTheme('light')">Light</button>
                <button class="border button" :class="{'selected': Store.theme == 'dark'}" @click="updateTheme('dark')">Dark</button>
            </div>

            <div>Account</div>
            <router-link class="border button" to="/change-name">Change Name</router-link>
            <router-link class="border button" to="/change-email">Change Email</router-link>
            <router-link class="border button" to="/change-password">Change Password</router-link>
            <button class="border error button" @click="showHistoryDialog = true">Delete Historic Data</button>
            <router-link class="border error button" to="/delete-account">Delete Account</router-link>

            <div>Subscription: {{ Store.subscriptionStatus == "active" ? "Active" : "Free" }}</div>
            <a v-if="Store.subscriptionStatus == 'active'" class="border button" href="https://billing.stripe.com/p/login/fZe16Ng0E4svc2Q6oo">Manage Subscription</a>
            <router-link v-else class="primary button" to="/pricing">Upgrade</router-link>

            <label class="label">
                Send me updates and promotions
                <input type="checkbox" v-model="Store.allowEmails" class="checkbox" @change="savePreferences"/>
            </label>
        </div>

        <div v-if="showHistoryDialog" class="dialog" @click.self.stop="showHistoryDialog = false">
            <div class="form card">
                <div>Are you sure you want to delete all historic value data on your account? This action cannot be undone.</div>
                <button class="primary error button" @click="deleteHistory()">Yes</button>
                <button class="simple button" @click="showHistoryDialog = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import HTTP from '../utilities/http'
    import Store from '../utilities/store'
    const showHistoryDialog = ref(false)
    Store.showSidebar = true;

    function updateTheme(theme) {
        Store.theme = theme
        savePreferences()
    }

    async function deleteHistory() {
        await HTTP.delete('/items/history')
        showHistoryDialog.value = false
        Store.getAllAssetData()
        Store.notification = {
            text: "Successfully deleted history",
            color: "var(--primary)"
        }
    }

    function savePreferences() {
        HTTP.patch('/auth/preferences', {
            theme: Store.theme,
            currency: Store.currency,
            itemsPerPage: Store.itemsPerPage,
            allowEmails: Store.allowEmails
        })
    }
</script>
