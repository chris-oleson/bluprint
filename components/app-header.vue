<template>
<header class="header">
    <nuxt-link class="logo link" to="/">
        <nuxt-img src="/images/logo.png" height="42" width="42" alt="bluprint logo"/>
        <h3>bluprint</h3>
    </nuxt-link>

    <div class="horizontal spacer"/>

    <button v-if="!viewport.isGreaterThan('tablet')" class="big simple icon button" @click="showMenu = !showMenu">
        <Icon name="mdi:menu"/>
    </button>

    <div v-if="showMenu" class="vertical list" @click="showMenu = false">
        <nuxt-link to="/dashboard" class="big background button">Dashboard</nuxt-link>
        <nuxt-link to="/custom-page-1" class="big background button">Custom Page 1</nuxt-link>
        <nuxt-link to="/custom-page-2" class="big background button">Custom Page 2</nuxt-link>
        <nuxt-link to="/contact" class="big background button">Support</nuxt-link>
        <nuxt-link to="/settings" class="big background button">Settings</nuxt-link>
        <button class="big background button" @click="store.logOut('/')">Sign Out</button>
    </div>
</header>
</template>

<script setup>
const viewport = useViewport()
const showMenu = ref(false)
const store = useStore()
</script>

<style scoped>
.logo {
    display: flex;
    align-items: center;
    gap: .5em;
}

.vertical.list {
    border: none;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    & .button {
        width: 100%;
        text-align: end;
        text-transform: none;
    }
}
</style>
