export default defineEventHandler(async event => {
    if (!event.context.user) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication is required' })
    }
    const body = await readBody(event)
    if (!body.newEmail || !body.password) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
    }
    if (!Email.validate(body.newEmail)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
    }
    if (!await Password.check(event.context.user, body.password, event.context.database)) {
        throw createError({ statusCode: 401, statusMessage: 'Incorrect password' })
    }
    if (await User.readWithEmail(body.newEmail, event.context.database)) {
        throw createError({ statusCode: 400, statusMessage: 'Email is already registered' })
    }

    const user = await User.readWithId(event.context.user, event.context.database)
    const token = await EmailToken.create(user.id, event.context.database)
    Email.sendEmailVerification(user.name, body.newEmail, token)

    return
})
