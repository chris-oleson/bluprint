<template>
    <div class="sidebar">
        <router-link class="big background icon text button" :class="{'selected': route.path == '/dashboard'}" to="/dashboard">
            <i class="mdi mdi-view-dashboard"/>
            Dashboard
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/tables'}" to="/tables">
            <i class="mdi mdi-table"/>
            Tables
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/forms'}" to="/forms">
            <i class="mdi mdi-format-align-left"/>
            Forms
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/custom-page-1'}" to="/custom-page-1">
            <i class="mdi mdi-note"/>
            Custom Page 1
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/custom-page-2'}" to="/custom-page-2">
            <i class="mdi mdi-note"/>
            Custom Page 2
        </router-link>

        <div class="vertical spacer"></div>

        <router-link class="big background icon text button" to="/contact">
            <i class="mdi mdi-email"/>
            Support
        </router-link>

        <router-link class="big background icon text button" :class="{'selected': route.path == '/settings'}" to="/settings">
            <i class="mdi mdi-cog"/>
            Settings
        </router-link>

        <button class="big background icon text button" @click="Store.logOut(router, '/')">
            <i class="mdi mdi-logout"/>
            Sign Out
        </button>
    </div>
</template>

<script setup>
import Store from '../utilities/store'
    import { useRouter, useRoute } from 'vue-router'
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
    }
    .background.button {
        border-radius: .5rem;
    }
    i {
        margin-right: 1rem;
    }
</style>
