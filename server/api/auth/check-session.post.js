export default defineEventHandler((event) => {
    if (!event.context.user) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication is required' })
    }
    return
})
