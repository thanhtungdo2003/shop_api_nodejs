import express from 'express';
import { create, deleleById, getAll, getByPage } from '../controllers/category';
import { adminAuthMiddleware } from '../authMiddleware';

const router = express.Router();

router.post(`/create`, create);
router.get(`/get-all`, getAll);
router.post(`/delete`, adminAuthMiddleware, deleleById);
router.post(`/get-by-page`, getByPage);

export default router;