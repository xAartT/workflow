import express from 'express';
import * as infoControllers from '../controllers/infoControllers.js';

const router = express.Router();

router.get('/username', infoControllers .getUsername);
router.get('/resumo-pedidos', infoControllers.getResumoPedidos);

export default router;
