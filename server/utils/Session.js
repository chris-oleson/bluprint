import Crypto from 'crypto'

export default {
    async check(sessionId, maximumAgeSeconds, databaseConnection) {
        const [sessions] = await databaseConnection.query("SELECT * FROM sessions WHERE id = ? AND created > NOW() - INTERVAL ? SECOND", [sessionId, maximumAgeSeconds])
        if (sessions.length) {
            return sessions[0]
        }
    },

    async create(userId, databaseConnection) {
        const sessionId = Crypto.randomUUID()
        await databaseConnection.query("INSERT INTO sessions VALUES (?, NOW(), ?)", [sessionId, userId])
        return sessionId
    },

    async refresh(sessionId, databaseConnection) {
        await databaseConnection.query("UPDATE sessions SET created = NOW() WHERE id = ?", [sessionId])
    },

    async delete(userId, databaseConnection) {
        if (!userId) {
            return
        }

        await databaseConnection.query("DELETE FROM sessions WHERE user_id = ?", [userId])
    },

    async clearExpired(maximumAgeSeconds, databaseConnection) {
        await databaseConnection.query("DELETE FROM sessions WHERE created < NOW() - INTERVAL ? SECOND", [maximumAgeSeconds])
    }
}
