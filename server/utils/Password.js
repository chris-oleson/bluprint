import Bcrypt from 'bcryptjs'

export default {
    async hash(plainTextPassword) {
        const salt = await Bcrypt.genSalt()
        const hashedPassword = await Bcrypt.hash(plainTextPassword, salt)
        return hashedPassword
    },

    async check(userId, password, databaseConnection) {
        const user = await User.readWithId(userId, databaseConnection)
        if (user && await Bcrypt.compare(password, user.password)) {
            return true
        }
    },

    async updateWithPassword(userId, newPassword, currentPassword, databaseConnection) {
        if (await this.check(userId, currentPassword, databaseConnection)) {
            const hashedPassword = await this.hash(newPassword)
            await databaseConnection.query("UPDATE users SET `password` = ? WHERE id = ?", [hashedPassword, userId])
        }
        else {
            throw new Error
        }
    },

    async updateWithToken(token, newPassword, databaseConnection) {
        const validatedToken = await EmailToken.check(token, 60 * 60 * 24, databaseConnection)
        if (validatedToken) {
            await EmailToken.delete(validatedToken.user_id, databaseConnection)
            await Session.delete(validatedToken.user_id, databaseConnection)
            const hashedPassword = await this.hash(newPassword)
            await databaseConnection.query("UPDATE users SET `password` = ? WHERE id = ?", [hashedPassword, validatedToken.user_id])
        }
        else {
            throw new Error
        }
    },

    async forgot(userEmail, databaseConnection) {
        const user = await User.readWithEmail(userEmail, databaseConnection)
        if (user) {
            const tokenId = await EmailToken.create(user.id, databaseConnection)
            Email.sendPasswordReset(user.name, user.email, tokenId)
        }
    }
}
