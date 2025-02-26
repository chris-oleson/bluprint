export default defineEventHandler(async event => {
    if (!event.context.user) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication is required' })
    }
    const body = await readBody(event)
    if ((!body.currentPassword) || !body.newPassword) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
    }
    if(!await Password.check(event.context.user, body.currentPassword, event.context.database)) {
        throw createError({ statusCode: 401, statusMessage: 'Password is incorrect' })
    }

    await Password.update(event.context.user, body.newPassword, event.context.database)
    return
})
