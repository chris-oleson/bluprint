import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        async logOut(redirectPath) {
            await $fetch('/api/auth/logout', { method: 'POST' })
            const colorMode = useColorMode()
            this.$reset()
            colorMode.preference = 'system'
            navigateTo(redirectPath)
        },
    },
    persist: true
})
