import jwt from 'jsonwebtoken'

const JWT_SECRET = 'segredo_super_forte'

export function autenticar(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ erro: 'Não autenticado' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        req.usuario = decoded 

        next()

    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido' })
    }
}
