import express from 'express';
const router = express.Router();

import { index, indexCategories, indexTypes, show, related } from '../controller/exerciseController.js';

//route -> index
router.get("/", index)
router.get("/categories", indexCategories)
router.get("/types", indexTypes)
router.get("/:id", show)
router.get("/related", related)

export default router