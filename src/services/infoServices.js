import { pool } from '../config/db.js';

export async function getUsernameAction(token) {
    const result = await pool.query(
        'select nome from usuarios where token = $1',
        [token]
    )

    return result.rows.length > 0 ? result.rows[0].nome : null;
};

export async function getResumoPedidosAction(empresaId) {
    const result = await pool.query("select count(*) as total from pedidos where cancelado = false and empresa_id = $1", [empresaId]);
    return result.rows[0].total;
};