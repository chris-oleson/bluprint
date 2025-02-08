<template>
    <header>
        <router-link class="logo link" to="/">
            <img src="../assets/images/logo.png" height="42" width="42" alt="bluprint logo"/>
            <h2 class="subtitle">bluprint</h2>
        </router-link>

        <div class="horizontal spacer"></div>

        <template v-if="windowWidth > 1024 && !Store.showSidebar">
            <router-link to="/" class="simple button">Home</router-link>
            <router-link to="/about" class="simple button">About</router-link>
            <router-link to="/pricing" class="simple button">Pricing</router-link>
            <router-link to="/contact" class="simple button">Contact</router-link>
            <div class="horizontal spacer"></div>
            <router-link v-if="Store.isLoggedIn" to="/dashboard" class="simple button">Dashboard</router-link>
            <button @click="Store.logOut(router, '/')" class="simple button" style="margin-right: 1em">Sign Out</button>
            <router-link v-if="!Store.isLoggedIn" to="/sign-in" class="simple button">Sign In</router-link>
            <router-link v-if="!Store.isLoggedIn" to="/sign-up" class="primary button">Sign Up</router-link>
        </template>

        <button v-if="Store.showSidebar && Store.privacy" title="Show details" class="big simple icon button" @click="Store.privacy = false"><eye-icon/></button>
        <button v-if="Store.showSidebar && !Store.privacy" title="Hide details" class="big simple icon button" @click="Store.privacy = true"><eye-off-icon/></button>

        <button v-if="windowWidth <= 1024" class="big simple icon button" @click="showMenu = !showMenu"><menu-icon/></button>
        <div v-if="showMenu" class="vertical list" @click="showMenu = false">
            <template v-if="Store.showSidebar">
                <router-link to="/dashboard" class="big background button">Dashboard</router-link>
                <router-link to="/assets" class="big background button">Assets</router-link>
                <router-link to="/liabilities" class="big background button">Liabilities</router-link>
            </template>

            <template v-else>
                <router-link to="/" class="big background button">Home</router-link>
                <router-link to="/about" class="big background button">About</router-link>
                <router-link to="/pricing" class="big background button">Pricing</router-link>
                <router-link to="/contact" class="big background button">Contact</router-link>
            </template>

            <template v-if="Store.isLoggedIn">
                <router-link v-if="!Store.showSidebar" to="/dashboard" class="big background button">Dashboard</router-link>
                <router-link v-else to="/contact" class="big background button">Support</router-link>
                <router-link to="/settings" class="big background button">Settings</router-link>
                <button @click="Store.logOut(router, '/')" class="big background button">Sign Out</button>
            </template>

            <template v-else>
                <router-link to="/sign-in" class="big background button">Sign In</router-link>
                <router-link to="/sign-up" class="big primary button">Join for Free</router-link>
            </template>
        </div>
    </header>
</template>

<script setup>
    import { ref } from 'vue'
    import MenuIcon from '../assets/icons/menu-icon'
    import EyeIcon from '../assets/icons/eye-icon'
    import EyeOffIcon from '../assets/icons/eye-off-icon'
    import Store from '../utilities/store'
    import useWindowWidth from '../utilities/use-window-width'
    const windowWidth = useWindowWidth()
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const showMenu = ref(false)
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
        margin-right: 85px;
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
