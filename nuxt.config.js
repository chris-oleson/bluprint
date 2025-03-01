import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    compatibilityDate: '2025-02-10',
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicon.png' }
            ]
        }
    },
    css: ['/assets/style.css'],
    modules: [
        '@nuxtjs/color-mode',
        'nuxt-viewport',
        '@nuxt/icon',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/eslint',
        'nuxt-security',
        '@nuxt/image'
    ],
    security: {
        headers: {
            contentSecurityPolicy: false
        },
    }
})
