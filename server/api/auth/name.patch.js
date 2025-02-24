export default defineEventHandler(async event => {
    if (!event.context.user) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication is required' })
    }
    const body = await readBody(event)
    if (!body.newName) {
        throw createError({ statusCode: 400, statusMessage: 'Name is required' })
    }
    await User.updateName(event.context.user, body.newName, event.context.database)
})
