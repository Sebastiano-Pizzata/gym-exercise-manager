import express from 'express';
const router = express.Router();

import { index, indexCategories, indexTypes, show, related } from '../controller/exerciseController.js';

//route -> index
router.get("/", index)
router.get("/categories", indexCategories)
router.get("/types", indexTypes)
router.get("/related", related)
router.get("/:id", show)


export default router