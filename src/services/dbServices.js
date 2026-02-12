import { pool } from '../config/db.js'

export async function checkHealthAction() {
    const status = pool.query('SELECT 1');

    if (!status) {
        throw new Error('Database connection failed');
    }
    return true
}
