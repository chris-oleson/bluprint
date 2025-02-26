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

    async update(userId, newPassword, databaseConnection) {
        const hashedPassword = await this.hash(newPassword)
        await databaseConnection.query("UPDATE users SET `password` = ? WHERE id = ?", [hashedPassword, userId])
    },

    async forgot(userEmail, databaseConnection) {
        const user = await User.readWithEmail(userEmail, databaseConnection)
        if (user) {
            const tokenId = await EmailToken.create(user.id, databaseConnection)
            Email.sendPasswordReset(user.name, user.email, tokenId)
        }
    }
}
