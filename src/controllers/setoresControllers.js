import * as service from '../services/setoresServices.js'

export async function criarSetor(req, res) {
    const {cor, icone, nome} = req.body;

    try {
        const resultado = await service.criarSetorAction(req.usuario.empresa_id, cor, icone, nome);

        if (!resultado) {
            return res.status(400).json({ erro: 'Não foi possível criar o setor' });
        }

        res.status(201).json({ mensagem: 'Setor criado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};

export async function listarSetores(req, res) {
    try {
        const resultado = await service.listarSetoresAction(req.usuario.empresa_id);
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};