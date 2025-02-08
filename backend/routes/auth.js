import { Router } from 'express'
import Email from '../utilities/email.js'
import Session from '../utilities/session.js'
import Password from '../utilities/password.js'
import User from '../utilities/user.js'
import EmailToken from '../utilities/email-token.js'
const router = Router()

router.post('/check-session', authenticate, (req, res) => {
    res.sendStatus(200)
})

router.post('/keep-alive', authenticate, (req, res) => {
    res.sendStatus(200)
})

router.post('/forgot', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).send("Email is required")
    }
    if (!Email.validate(req.body.email)) {
        return res.status(400).send("Invalid email")
    }

    res.sendStatus(200)
    await Password.forgot(req.body.email, req.database)
})

router.patch('/password', async (req, res) => {
    if ((!req.body.token && !req.body.currentPassword) || !req.body.newPassword) {
        return res.status(400).send('All fields are required')
    }

    if (req.body.token) {
        try {
            await Password.updateWithToken(req.body.token, req.body.newPassword, req.database)
            res.sendStatus(200)
        }
        catch {
            res.status(401).send('Invalid token')
        }
    }
    else if (req.body.currentPassword) {
        try {
            await Password.updateWithPassword(req.user, req.body.newPassword, req.body.currentPassword, req.database)
            res.sendStatus(200)
        }
        catch {
            res.status(401).send('Incorrect password')
        }
    }
})

router.patch('/name', authenticate, async (req, res) => {
    if (!req.body.newName) {
        return res.status(400).send('Name required')
    }

    await User.updateName(req.user, req.body.newName, req.database)
    res.sendStatus(200)
})

router.patch('/email', authenticate, async (req, res) => {
    if (!req.body.newEmail || !req.body.password) {
        return res.status(400).send('All fields are required')
    }
    if (!Email.validate(req.body.newEmail)) {
        return res.status(400).send("Invalid email address")
    }
    if (!await Password.check(req.user, req.body.password, req.database)) {
        return res.status(401).send('Incorrect password')
    }
    if (await User.readWithEmail(req.body.newEmail, req.database)) {
        return res.status(400).send('Email is already registered')
    }

    res.sendStatus(200)
    const user = await User.readWithId(req.user, req.database)
    const token = await EmailToken.create(user.id, req.database)
    Email.sendEmailVerification(user.name, req.body.newEmail, token)
})

router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("All fields are required")
    }
    const user = await User.readWithEmail(req.body.email, req.database)
    if (!user) {
        return res.status(404).send("Incorrect username or password")
    }
    if (!await Password.check(user.id, req.body.password, req.database)) {
        return res.status(404).send("Incorrect username or password")
    }
    if (!user.verified) {
        return res.status(401).send("This account has not been verified")
    }

    let [
        response,
        sessionId,
    ] = await Promise.all([
        User.readPrefs(user.id, req.database),
        Session.create(user.id, req.database)
    ])

    response.name = user.name
    response.subscription_status = user.subscription_status
    res.cookie('sessionId', sessionId, {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
    })

    res.status(200).send(response)
    await User.updateLastLogin(user.id, req.database)
})

router.post('/create', async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send('All fields are required')
    }
    if (!Email.validate(req.body.email)) {
        return res.status(400).send('Invalid email address')
    }
    if (await User.readWithEmail(req.body.email, req.database)) {
        return res.status(400).send('This email is already registered')
    }

    res.sendStatus(200)
    await User.create(req.body.email, req.body.password, req.body.name, req.database)
})

router.post('/resend', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).send("Missing email address")
    }
    if (!Email.validate(req.body.email)) {
        return res.status(400).send("Invalid email address")
    }

    res.sendStatus(200)
    const user = await User.readWithEmail(req.body.email, req.database)
    if (user) {
        const sessionID = await Session.create(user.id, req.database)
        Email.sendEmailVerification(user.name, user.name, sessionID)
    }
})

router.post('/verify', async (req, res) => {
    if (!req.body.token || !req.body.email) {
        return res.status(400).send('Missing request fields')
    }
    const validatedToken = await EmailToken.check(req.body.token, 60 * 60 * 24, req.database)
    if (!validatedToken) {
        return res.status(404).send('Invalid token')
    }

    const user = await User.readWithId(validatedToken.user_id, req.database)
    await User.updateEmail(user.id, req.body.email, user.email, req.database)
    req.user = user.id
    await EmailToken.delete(user.id, req.database)
    await Session.delete(user.id, req.database)
    const sessionId = await Session.create(user.id, req.database)
    res.cookie('sessionId', sessionId, {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
    })
    res.status(200).send(user.name)
})

router.get('/subscription-status', authenticate, async (req, res) => {
    const user = await User.readWithId(req.user, req.database)
    res.status(200).send(user.subscription_status)
})

router.patch('/preferences', authenticate, async (req, res) => {
    await User.updatePrefs(req.user, req.body, req.database)
    res.sendStatus(200)
})

router.post('/logout', async (req, res) => {
    await Session.delete(req.user, req.database)
    res.sendStatus(200)
})

router.delete('/', authenticate, async (req, res) => {
    if (!req.body.password) {
        res.status(400).send('Password is required')
        return
    }
    if (!await Password.check(req.user, req.body.password, req.database)) {
        res.status(401).send('Incorrect password')
        return
    }

    await User.delete(req.user, req.database)
    res.sendStatus(200)
})

router.post('/update', async (req, res) => {
    await Session.clearExpired(60 * 60 * 24, req.database)
    res.sendStatus(200)
})

function authenticate(req, res, next) {
    if (!req.user) {
        return res.sendStatus(401)
    }
    next()
}

export default router
