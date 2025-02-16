import Mysql from 'mysql2/promise'

export default defineNitroPlugin(async (nitro) => {
    const connectionPool = Mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'bluprint-db',
        timezone: '+00:00'
    })

    nitro.hooks.hook('request', (event) => {
        event.context.database = connectionPool
    })
})
