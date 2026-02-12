import * as service from '../services/infoServices.js'

export async function getUsername(req, res) {
    try {
        const token = req.cookies.token;

        const username = await service.getUsernameAction(token);

        if (!username) {
            return res.status(401).json({ erro: 'Token inválido ou usuário não encontrado' });
        }

        res.json({ username });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};

export async function getResumoPedidos(req, res) {
    try {
        const data = await service.getResumoPedidosAction(req.usuario.empresa_id);

        if (!data) {
            return res.status(401).json({ erro: 'Token inválido ou usuário não encontrado' });
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};