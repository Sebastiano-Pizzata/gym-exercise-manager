import express from 'express';
const router = express.Router();

import exerciseController from '../controller/exerciseController.js';

//route -> index
router.get("/", exerciseController.index)

export default router