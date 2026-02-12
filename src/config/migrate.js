import { pool } from './db.js';
import sql from './schemas.js';

try {
    await pool.query(sql);

    console.log("Migrations criadas com sucesso!");
} catch (error) {
    console.error("Ocorreu um erro ao criar as migrations", error);
}