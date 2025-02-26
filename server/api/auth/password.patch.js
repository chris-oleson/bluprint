export default defineEventHandler(async event => {
    const body = await readBody(event)
    if ((!body.token) || !body.newPassword) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
    }
    if(!await Password.check(event.context.user, body.currentPassword, event.context.database)) {
        throw createError({ statusCode: 401, statusMessage: 'Password is incorrect' })
    }
    const validatedToken = await EmailToken.check(body.token, 60 * 60 * 24, event.context.database)
    if (!validatedToken) {
        throw createError({ statusCode: 401, statusMessage: 'Token is invalid' })
    }

    await EmailToken.delete(validatedToken.user_id, event.context.database)
    await Session.delete(validatedToken.user_id, event.context.database)
    await Password.update(validatedToken.user_id, body.newPassword, event.context.database)
    return
})
