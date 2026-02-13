import express from 'express';
import * as controller from '../controllers/setoresControllers.js';

const router = express.Router();

router.post('/setores', controller.criarSetor);
router.get('/setores', controller.listarSetores);

export default router;
