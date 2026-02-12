import jwt from 'jsonwebtoken'
import * as service from '../services/infoServices.js'

const JWT_SECRET = process.env.JWT_SECRET

export default function autenticar(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        req.usuario = decoded

        next()
    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido', detalhes: error.message })
    }
}
