import jwt from 'jsonwebtoken'
import * as authServices from '../services/authServices.js'

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req, res) {

    try {
        const { login, senha } = req.body
        const ambiente = process.env.AMBIENTE

        if (!login || !senha) {
            return res.status(400).json({ erro: 'Login e senha são obrigatórios' })
        }

        const usuario = await authServices.loginAction(login, senha)

        if (!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas' })
        }

        const token = jwt.sign(
            usuario,
            JWT_SECRET,
            { expiresIn: '8h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: ambiente === 'prod',
            sameSite: 'lax'
        })

        await authServices.salvarToken(usuario.id, token);

        res.json({ mensagem: 'Login realizado com sucesso' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: 'Erro interno do servidor' })
    }
}
