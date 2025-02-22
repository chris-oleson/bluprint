import Stripe from 'stripe'
import Session from './Session.js'
import EmailToken from './EmailToken.js'
import Password from './Password.js'
import Email from './Email.js'

const stripe = process.env.STRIPE_API_KEY ? Stripe(process.env.STRIPE_API_KEY) : null

export default {
    async create(email, plainTextPassword, name, databaseConnection) {
        email = email.toLowerCase()
        const hashedPassword = await Password.hash(plainTextPassword)
        const [newUser] = await databaseConnection.query("INSERT INTO users VALUES (NULL, ?, ?, ?, CURRENT_DATE(), NULL, 'free', 0)", [email, hashedPassword, name])
        await databaseConnection.query("INSERT INTO user_preferences VALUES (NULL, 'system', 'USD', 5, 1, ?)", [newUser.insertId])
        const tokenId = await EmailToken.create(newUser.insertId, databaseConnection)
        if (process.env.POSTMARK_API_KEY) {
            Email.sendEmailVerification(name, email, tokenId)
        }
    },

    async readWithEmail(email, databaseConnection) {
        email = email.toLowerCase()
        const [users] = await databaseConnection.query('SELECT * FROM users WHERE email = ?', [email])
        return users.length ? users[0] : null
    },

    async readWithId(userId, databaseConnection) {
        const [users] = await databaseConnection.query('SELECT * FROM users WHERE id = ?', [userId])
        return users.length ? users[0] : null
    },

    async updateEmail(userId, newEmail, existingEmail, databaseConnection) {
        newEmail = newEmail.toLowerCase()
        existingEmail = existingEmail.toLowerCase()
        if (newEmail == existingEmail) {
            await databaseConnection.query("UPDATE users SET verified = 1, last_login = CURRENT_DATE() WHERE id = ?", [userId])
        }
        else {
            await databaseConnection.query("UPDATE users SET email = ?, WHERE id = ?", [newEmail, userId])
        }
    },

    async readPrefs(userId, databaseConnection) {
        let [userPrefs] = await databaseConnection.query("SELECT * FROM user_preferences WHERE user_id = ?", [userId])
        return userPrefs[0]
    },

    async updatePrefs(userId, userPrefs, databaseConnection) {
        await databaseConnection.query("UPDATE user_preferences SET theme = ?, currency = ?, items_per_page = ?, allow_emails = ? WHERE user_id = ?", [userPrefs.theme, userPrefs.currency, userPrefs.itemsPerPage, userPrefs.allowEmails, userId])
    },

    async updateLastLogin(userId, databaseConnection) {
        await databaseConnection.query("UPDATE users SET last_login = CURRENT_DATE() WHERE id = ?", [userId])
    },

    async updateName(userId, name, databaseConnection) {
        await databaseConnection.query("UPDATE users SET name = ? WHERE id = ?", [name, userId])
    },

    async updateSubscriptionStatus(email, subscriptionStatus, databaseConnection) {
        email = email.toLowerCase()
        await databaseConnection.query("UPDATE users SET subscription_status = ? WHERE email = ?", [subscriptionStatus, email])
    },

    async delete(userId, databaseConnection) {
        const user = await this.readWithId(userId, databaseConnection)
        const customerResult = await stripe.customers.list({ email: user.email })
        if (customerResult.data.length) {
            const subscriptionResult = await stripe.subscriptions.list({ customer: customerResult.data[0].id })
            if (subscriptionResult.data.length) {
                await stripe.subscriptions.cancel(subscriptionResult.data[0].id)
            }
        }
        await databaseConnection.query("DELETE FROM user_preferences WHERE user_id = ?", [userId])
        await databaseConnection.query("DELETE FROM users WHERE id = ?", [userId])
        await EmailToken.delete(userId, databaseConnection)
        await Session.delete(userId, databaseConnection)
    }
}
