import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'

export async function loginAction(login, senha) {

    const result = await pool.query(
        'select * from usuarios where login = $1',
        [login]
    )

    if (result.rows.length === 0) {
        return null
    }

    const usuario = result.rows[0]

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash)

    if (!senhaValida) {
        return null
    }

    return {
        id: usuario.id,
        empresa_id: usuario.empresa_id,
        nome: usuario.nome,
        tipo: usuario.tipo
    }
}
