import * as setorService from '../services/dbServices.js'

export async function checkHealth(req, res) {
    try {
        const status = await setorService.checkHealthAction();

        res.json({ status : status ? "OK" : "FAIL" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro interno do servidor" })
    }
}
