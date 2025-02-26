export default defineEventHandler(async event => {
    if (!event.context.user) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication is required' })
    }
    const body = await readBody(event)
    if (!body.password) {
        throw createError({ statusCode: 400, statusMessage: 'Password is required' })
    }
    if (!await Password.check(event.context.user, body.password, event.context.database)) {
        throw createError({ statusCode: 400, statusMessage: 'Incorrect password' })
    }
    await User.delete(event.context.user, event.context.database)
    return
})
