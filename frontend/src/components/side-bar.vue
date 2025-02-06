<template>
    <div class="sidebar">
        <router-link class="big background icon text button" :class="{'selected': route.path == '/dashboard'}" to="/dashboard">
            <view-dashboard-icon/>
            Dashboard
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/assets'}" to="/assets">
            <cash-multiple-icon/>
            Assets
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/liabilities'}" to="/liabilities">
            <credit-card-multiple-icon/>
            Liabilities
        </router-link>

        <div class="vertical spacer"></div>

        <router-link class="big background icon text button" to="/contact">
            <email-icon/>
            Support
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/settings'}" to="/settings">
            <cog-icon/>
            Settings
        </router-link>

        <button class="big background icon text button" @click="Store.logOut(router, '/')">
            <logout-icon/>
            Sign Out
        </button>
    </div>
</template>

<script setup>
import Store from '../utilities/store'
    import { useRouter, useRoute } from 'vue-router'
    import ViewDashboardIcon from '../assets/icons/view-dashboard-icon'
    import CreditCardMultipleIcon from '../assets/icons/credit-card-multiple-icon'
    import CashMultipleIcon from '../assets/icons/cash-multiple-icon'
    import CogIcon from '../assets/icons/cog-icon'
    import LogoutIcon from '../assets/icons/logout-icon'
    import EmailIcon from '../assets/icons/email-icon'
    const route = useRoute()
    const router = useRouter()
</script>

<style scoped>
    .sidebar {
        width: var(--sidebar-width);
        top: var(--header-height);
        z-index: 10;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        gap: .5em;
        padding: .5em;
        box-shadow: var(--shadow);
        border-right: 1px solid var(--low-accent);
    }
    .background.button {
        border-radius: .5rem;
    }
    svg {
        margin-right: 1em;
    }
</style>
