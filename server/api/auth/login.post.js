export default defineEventHandler(async event => {
    const body = await readBody(event)
    if (!body.email || !body.password) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
    }
    const user = await User.readWithEmail(body.email, event.context.database)
    if (!user) {
        throw createError({ statusCode: 400, statusMessage: 'Incorrect username or password' })
    }
    if (!await Password.check(user.id, body.password, event.context.database)) {
        throw createError({ statusCode: 400, statusMessage: 'Incorrect username or password' })
    }
    if (process.env.POSTMARK_API_KEY && !user.verified) {
        throw createError({ statusCode: 401, statusMessage: 'This account has not been verified' })
    }

    const response = await User.readPrefs(user.id, event.context.database)
    const sessionId = await Session.create(user.id, event.context.database)

    response.name = user.name
    response.subscription_status = user.subscription_status
    setCookie(event, 'sessionId', sessionId, {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
    })

    User.updateLastLogin(user.id, event.context.database)
    return response
})
