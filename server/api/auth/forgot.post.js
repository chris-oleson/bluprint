export default defineEventHandler(async event => {
    const body = await readBody(event)
    if (!body.email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is required' })
    }
    if (!Email.validate(body.email)) {
        throw createError({ statusCode: 400, statusMessage: 'Email is invalid' })
    }

    Password.forgot(body.email, event.context.database)
    return
})
