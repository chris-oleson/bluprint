export default defineEventHandler(async event => {
    const body = await readBody(event)
    if ((!body.token) || !body.newPassword) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
    }
    const validatedToken = await EmailToken.check(body.token, 60 * 60 * 24, event.context.database)
    if (!validatedToken) {
        throw createError({ statusCode: 401, statusMessage: 'Token is invalid' })
    }

    await EmailToken.delete(validatedToken.user_id, event.context.database)
    await Session.delete(validatedToken.user_id, event.context.database)
    await Password.update(validatedToken.user_id, body.newPassword, event.context.database)
    const user = await User.readWithId(validatedToken.user_id, event.context.database)
    const response = await User.readPrefs(user.id, event.context.database)
    const sessionId = await Session.create(user.id, event.context.database)
    response.name = user.name
    response.subscription_status = user.subscription_status
    setCookie(event, 'sessionId', sessionId, {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
    })

    return { response }
})
