<template>
<div v-if="viewport.isGreaterThan('tablet')" class="sidebar">
    <NuxtLink class="big background icon text button" :class="{'selected': route.path == '/dashboard'}" to="/dashboard">
        <Icon name="ic:baseline-dashboard"/>
        Dashboard
    </NuxtLink>

    <NuxtLink class="big background icon text button" :class="{'selected': route.path == '/custom-page-1'}" to="/custom-page-1">
        <Icon name="material-symbols:note"/>
        Custom Page 1
    </NuxtLink>

    <NuxtLink class="big background icon text button" :class="{'selected': route.path == '/custom-page-2'}" to="/custom-page-2">
        <Icon name="material-symbols:note"/>
        Custom Page 2
    </NuxtLink>

    <div class="vertical spacer"/>

    <NuxtLink class="big background icon text button" to="/contact">
        <Icon name="ic:baseline-mail"/>
        Support
    </NuxtLink>

    <NuxtLink class="big background icon text button" :class="{'selected': route.path == '/settings'}" to="/settings">
        <Icon name="ic:baseline-settings"/>
        Settings
    </NuxtLink>

    <button class="big background icon text button" @click="store.logOut('/')">
        <Icon name="ic:baseline-logout"/>
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
    padding: 0 .5em;
}
.background.button {
    border-radius: .5rem;
}
.iconify {
    margin-right: 1rem;
}
</style>
