import Session from '../utils/Session.js'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
    const sessionId = getCookie(event, 'sessionId')
    if (sessionId) {
        const validSession = await Session.check(sessionId, 60 * 30, event.context.database)
        if (validSession) {
            event.context.user = validSession.user_id
            if (event.node.req.url !== '/auth/check-session') {
                await Session.refresh(validSession.id, event.context.database)
            }
        }
    }
})
