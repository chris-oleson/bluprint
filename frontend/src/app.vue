<template>
    <TopBar/>
    <SideBar v-if="Store.showSidebar && windowWidth > 1024"/>
    <div class="content" :class="{'full-width': !Store.showSidebar || windowWidth <= 1024}">
        <router-view/>

        <div v-if="showNotification" class="notification">
            <div class="card" :style="'background-color: ' + Store.notification.color">{{ Store.notification.text }}</div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import Store from './utilities/store'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    import TopBar from './components/top-bar'
    import SideBar from './components/side-bar'
    import useWindowWidth from './utilities/use-window-width'
    import HTTP from './utilities/http'
    const windowWidth = useWindowWidth()

    checkSession()
    setInterval(checkSession, 1000 * 60 * 5)
    async function checkSession() {
        if (Store.isLoggedIn) {
            try {
                await HTTP.post('/auth/check-session')
            }
            catch {
                Store.logOut(router, '/sign-in')
            }
        }
    }

    let clicked = true
    let canClick = true
    document.addEventListener('click', () => {
        if (!clicked && Store.isLoggedIn) {
            HTTP.post('/auth/keep-alive')
            clicked = true
        }
        else if (canClick) {
            canClick = false
            setTimeout(() => {
                clicked = false
                canClick = true
            }, 1000 * 60 * 5)
        }
    })

    setTheme()
    watch(() => Store.theme, () => {
        setTheme()
    })
    function setTheme() {
        if (Store.theme == 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                Store.activeTheme = 'dark'
                document.documentElement.setAttribute('data-theme', 'dark');
            }
            else {
                Store.activeTheme = 'light'
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }
        else {
            Store.activeTheme = Store.theme
            document.documentElement.setAttribute('data-theme', Store.theme);
        }
    }

    const showNotification = ref(false)
    watch(() => Store.notification, () => {
        if (Store.notification.text) {
            showNotification.value = true
            setTimeout(() => {
                showNotification.value = false;
            }, "4000");
        }
    })
</script>

<style scoped>
    .content {
        background-color: var(--background);
        padding-top: var(--header-height);
        padding-left: var(--sidebar-width);
        position: absolute;
        width: 100%;
        min-height: 100%;
        height: 100%;
    }
    .full-width {
        padding-left: 0;
    }

    .notification {
        position: fixed;
        bottom: 1em;
        left: 0;
        right: 0;
        & .card {
            animation: 1s ease-out 3s fadeOut forwards;
            z-index: 1000;
            margin: 0 auto;
            width: fit-content;
            text-wrap: none;
            color: white;
            border: none;
        }
    }
    @keyframes fadeOut { to { opacity: 0; } }

    .banner {
        background-color: var(--warning);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5em 1em;
    }
</style>
