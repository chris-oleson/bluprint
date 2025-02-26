export default defineEventHandler(async event => {
    if (!event.context.user) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication is required' })
    }
    const body = await readBody(event)
    await User.updatePrefs(event.context.user, body, event.context.database)
})
