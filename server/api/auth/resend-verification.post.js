export default defineEventHandler(async event => {
    const body = await readBody(event)
    if (!body.email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is required' })
    }
    if (!Email.validate(body.email)) {
        throw createError({ statusCode: 400, statusMessage: 'Email is invalid' })
    }
    const user = await User.readWithEmail(body.email, event.context.database)
    if (!user) {
        throw createError({ statusCode: 400, statusMessage: 'User does not exist' })
    }

    const token = await EmailToken.create(user.id, event.context.database)
    Email.sendEmailVerification(user.name, user.email, token)
    return
})
