import express from 'express';
import { create, getAll, getByPage } from '../controllers/category';

const router = express.Router();

router.post(`/create`, create);
router.get(`/get-all`, getAll);
router.post(`/get-by-page`, getByPage);

export default router;