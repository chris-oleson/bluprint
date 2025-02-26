export default defineEventHandler(async event => {
    const body = await readBody(event)
    if (!body.token || !body.email) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
    }
    const validatedToken = await EmailToken.check(body.token, 60 * 60 * 24, event.context.database)
    if (!validatedToken) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
    }

    const user = await User.readWithId(validatedToken.user_id, event.context.database)
    await User.updateEmail(user.id, body.email, user.email, event.context.database)
    event.context.user = user.id
    await EmailToken.delete(user.id, event.context.database)
    await Session.delete(user.id, event.context.database)
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
