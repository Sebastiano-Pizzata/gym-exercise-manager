import express from 'express';
const router = express.Router();

import { index, indexCategories, indexTypes } from '../controller/exerciseController.js';

//route -> index
router.get("/", index)
router.get("/categories", indexCategories)
router.get("/types", indexTypes)

export default router