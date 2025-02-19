<template>
    <header>
        <NuxtLink class="logo link" to="/">
            <img src="../assets/images/logo.png" height="42" width="42" alt="bluprint logo"/>
            <h2 class="subtitle">bluprint</h2>
        </NuxtLink>

        <div class="horizontal spacer"></div>

        <NuxtLink to="/" class="simple button">Home</NuxtLink>
        <NuxtLink to="/about" class="simple button">About</NuxtLink>
        <NuxtLink to="/pricing" class="simple button">Pricing</NuxtLink>
        <NuxtLink to="/contact" class="simple button">Contact</NuxtLink>

        <div class="horizontal spacer"></div>

        <template v-if="store.isLoggedIn">
            <router-link to="/dashboard" class="simple button">Dashboard</router-link>
            <button @click="store.logOut('/')" class="simple button">Sign Out</button>
        </template>
        <template v-else>
            <NuxtLink to="/sign-in" class="simple button">Sign In</NuxtLink>
            <NuxtLink to="/sign-up" class="primary button">Sign Up</NuxtLink>
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
