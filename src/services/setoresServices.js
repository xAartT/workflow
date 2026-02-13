import { pool } from '../config/db.js';

export async function criarSetorAction(empresa, cor, icone, nome) {
    const result = await pool.query(
        'insert into setores (empresa_id, cor, icone, nome) values ($1, $2, $3, $4)',
        [empresa, cor, icone, nome]
    );
    return result.rowCount > 0;
};

export async function listarSetoresAction(empresa) {
    const result = await pool.query(
        'select id, cor, icone, nome from setores where empresa_id = $1',
        [empresa]
    );
    return result.rows; 
}