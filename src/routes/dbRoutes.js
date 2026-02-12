import express from 'express'
import * as dbController from '../controllers/dbControllers.js'

const router = express.Router()

router.get('/health', dbController.checkHealth)

export default router
