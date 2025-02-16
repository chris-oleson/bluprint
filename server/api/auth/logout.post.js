export default defineEventHandler(async event => {
    await Session.delete(event.context.user, event.context.database)
    return
})
