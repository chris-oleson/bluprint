<template>
<div v-if="viewport.isGreaterThan('tablet')" class="sidebar">
    <nuxt-link class="big background icon text button" :class="{'selected': route.path == '/dashboard'}" to="/dashboard">
        <Icon name="mdi:view-dashboard"/>
        Dashboard
    </nuxt-link>

    <nuxt-link class="big background icon text button" :class="{'selected': route.path == '/custom-page-1'}" to="/custom-page-1">
        <Icon name="mdi:note"/>
        Custom Page 1
    </nuxt-link>

    <nuxt-link class="big background icon text button" :class="{'selected': route.path == '/custom-page-2'}" to="/custom-page-2">
        <Icon name="mdi:note"/>
        Custom Page 2
    </nuxt-link>

    <div class="vertical spacer"/>

    <nuxt-link class="big background icon text button" to="/contact">
        <Icon name="mdi:email"/>
        Support
    </nuxt-link>

    <nuxt-link class="big background icon text button" :class="{'selected': route.path == '/settings'}" to="/settings">
        <Icon name="mdi:cog"/>
        Settings
    </nuxt-link>

    <button class="big background icon text button" @click="store.logOut('/')">
        <Icon name="mdi:logout"/>
        Sign Out
    </button>
</div>
</template>

<script setup>
const route = useRoute()
const store = useStore()
const viewport = useViewport()
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
    padding: .5rem;
    padding-top: 0;
}
.background.button {
    border-radius: .5rem;
}
.iconify {
    margin-right: 1rem;
}
</style>
