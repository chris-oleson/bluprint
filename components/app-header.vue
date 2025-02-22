<template>
<header>
    <nuxt-link class="logo link" to="/">
        <img src="../assets/images/logo.png" height="42" width="42" alt="bluprint logo">
        <h2 class="subtitle">bluprint</h2>
    </nuxt-link>

    <div class="horizontal spacer"/>

    <template v-if="store.isLoggedIn">
        <nuxt-link to="/dashboard" class="simple button">Dashboard</nuxt-link>
        <button class="simple button" @click="store.logOut('/')">Sign Out</button>
    </template>
    <template v-else>
        <nuxt-link to="/sign-in" class="simple button">Sign In</nuxt-link>
        <nuxt-link to="/sign-up" class="primary button">Sign Up</nuxt-link>
    </template>
</header>
</template>

<script setup>
const store = useStore()
</script>

<style scoped>
header {
    background-color: var(--background);
    height: var(--header-height);
    z-index: 20;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    gap: 3em;
    padding: 0 1em;
}

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
