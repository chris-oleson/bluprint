import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        isLoggedIn: false,
        allowEmails: false,
        subscriptionStatus: 'free',
        name: ''
    }),
    actions: {
        async logOut(redirectPath) {
            await $fetch('/api/auth/logout', { method: 'POST' })
            const colorMode = useColorMode()
            colorMode.preference = 'system'
            navigateTo(redirectPath)
            this.$reset()
        },
    },
    persist: true
})
