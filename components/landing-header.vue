<template>
<header class="header">
    <nuxt-link class="logo link" to="/">
        <nuxt-img src="/images/logo.png" height="42" width="42" alt="bluprint logo"/>
        <h3>bluprint</h3>
    </nuxt-link>

    <div class="horizontal spacer"/>

    <template v-if="viewport.isGreaterThan('tablet')">
        <nuxt-link to="/" class="simple button">Home</nuxt-link>
        <nuxt-link to="/about" class="simple button">About</nuxt-link>
        <nuxt-link to="/pricing" class="simple button">Pricing</nuxt-link>
        <nuxt-link to="/contact" class="simple button">Contact</nuxt-link>
        <div class="horizontal spacer"/>

        <template v-if="store.isLoggedIn">
            <nuxt-link to="/dashboard" class="simple button">Dashboard</nuxt-link>
            <button class="simple button" style="margin-right: 1rem;" @click="store.logOut('/')">Sign Out</button>
        </template>
        <template v-else>
            <nuxt-link to="/sign-in" class="simple button">Sign In</nuxt-link>
            <nuxt-link to="/sign-up" class="primary button" style="margin-right: 1rem;">Sign Up</nuxt-link>
        </template>
    </template>

    <button v-else class="big simple icon button" @click="showMenu = !showMenu">
        <Icon name="mdi:menu"/>
    </button>

    <div v-if="showMenu" class="vertical list" @click="showMenu = false">
        <nuxt-link to="/" class="big background button">Home</nuxt-link>
        <nuxt-link to="/about" class="big background button">About</nuxt-link>
        <nuxt-link to="/pricing" class="big background button">Pricing</nuxt-link>
        <nuxt-link to="/contact" class="big background button">Contact</nuxt-link>

        <template v-if="store.isLoggedIn">
            <nuxt-link to="/dashboard" class="big background button">Dashboard</nuxt-link>
            <button class="big background button" @click="store.logOut('/')">Sign Out</button>
        </template>

        <template v-else>
            <nuxt-link to="/sign-in" class="big background button">Sign In</nuxt-link>
            <nuxt-link to="/sign-up" class="big primary button">Join for Free</nuxt-link>
        </template>
    </div>
</header>
</template>

<script setup>
const store = useStore()
const viewport = useViewport()
const showMenu = ref(false)
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
