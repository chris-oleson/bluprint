export default defineNuxtRouteMiddleware(() => {
    const store = useStore()
    if (!store.isLoggedIn) {
        return navigateTo('/sign-in')
    }
})
