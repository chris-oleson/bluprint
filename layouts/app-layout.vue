<template>
<div>
    <app-header/>
    <app-sidebar/>
    <div class="content" :class="{'sidebar': viewport.isGreaterThan('tablet')}">
        <slot/>
    </div>
</div>
</template>

<script setup>
const viewport = useViewport()
const store = useStore()

async function checkSession() {
    if (store.isLoggedIn) {
        try {
            await $fetch('/api/auth/check-session', { method: 'POST' })
        }
        catch {
            store.logOut('/sign-in')
        }
    }
}

onMounted(() => {
    setInterval(checkSession, 1000 * 60 * 5)

    let clicked = true
    let canClick = true
    document.addEventListener('click', async () => {
        if (!clicked && store.isLoggedIn) {
            await $fetch('/api/auth/keep-alive', { method: 'POST' })
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
})
</script>

<style scoped>
.content {
    background-color: var(--background);
    padding-top: var(--header-height);
    position: absolute;
    width: 100%;
    min-height: 100%;
    height: 100%;
    &.sidebar {
        padding-left: var(--sidebar-width);
    }
}
</style>
