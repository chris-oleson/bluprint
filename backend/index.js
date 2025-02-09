import Session from './utilities/session.js'
import Mysql from 'mysql2/promise'
import Database from './utilities/database.js'
import Express from 'express'
const app = Express()

// Cookies
import cookieParser from 'cookie-parser'
app.use(cookieParser())

// CORS
import cors from 'cors'
var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}
app.use(cors(corsOptions))

// Rate limiting
import { rateLimit } from 'express-rate-limit'
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Requests per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})
app.use(limiter)
app.set('trust proxy', 3)

// Create database connection pool
const connectionPool = Mysql.createPool(Database)

// Status check route
app.get('/status', (req, res) => {
    res.sendStatus(200)
})

// Authenticates requests
app.use(checkAuthenticated)
async function checkAuthenticated(req, res, next) {
    req.database = connectionPool
    if (req.cookies.sessionId) {
        const validSession = await Session.check(req.cookies.sessionId, 60 * 30, req.database)
        if (validSession) {
            req.user = validSession.user_id
            if (req.path != '/auth/check-session') {
                await Session.refresh(validSession.id, req.database)
            }
        }
    }
    next()
}

// Stripe routes need to come before JSON parsing; stripe needs the raw body.
import stripe from './routes/stripe.js'
app.use('/stripe', stripe)

// Parsing data
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())

// Registered routes
import auth from './routes/auth.js'
app.use('/auth', auth)

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT)
})
