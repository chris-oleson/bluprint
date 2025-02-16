export default defineEventHandler(async event => {
    const body = await readBody(event)
    await User.updatePrefs(event.context.user, body, event.context.database)
})
