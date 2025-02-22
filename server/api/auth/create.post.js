export default defineEventHandler(async event => {
    const body = await readBody(event)
    if (!body.name || !body.email || !body.password) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
    }
    if (!Email.validate(body.email)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
    }
    if (await User.readWithEmail(body.email, event.context.database)) {
        throw createError({ statusCode: 400, statusMessage: 'This email is already registered' })
    }

    await User.create(body.email, body.password, body.name, event.context.database)
    return
})
