import Crypto from 'crypto'

export default {
    async check(tokenId, maximumAgeSeconds, databaseConnection) {
        const [tokens] = await databaseConnection.query("SELECT * FROM email_tokens WHERE id = ? AND created > NOW() - INTERVAL ? SECOND", [tokenId, maximumAgeSeconds])
        if (tokens.length) {
            return tokens[0]
        }
    },

    async create(userId, databaseConnection) {
        const tokenId = Crypto.randomUUID()
        await databaseConnection.query("INSERT INTO email_tokens VALUES (?, NOW(), ?)", [tokenId, userId])
        return tokenId
    },

    async delete(userId, databaseConnection) {
        await databaseConnection.query("DELETE FROM email_tokens WHERE user_id = ?", [userId])
    }
}
