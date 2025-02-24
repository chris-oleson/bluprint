import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        isLoggedIn: false,
        allowEmails: false,
        subscriptionStatus: 'free',
        name: '',
        theme: 'system',
        notification: {
            text: '',
            color: ''
        },
    }),
    actions: {
        async logOut(redirectPath) {
            await $fetch('/api/auth/logout', { method: 'POST' })
            navigateTo(redirectPath)
            this.$reset()
        },
    },
    persist: true
})
