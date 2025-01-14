import 'dotenv/config'
import pg from 'pg';
import { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../config.js'


const { Pool } = pg
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString
})

try {
    await db.query('SELECT NOW()')
    console.log('Connected to database')
} catch (error) {
    console.error('Error connecting to database:', error)

}