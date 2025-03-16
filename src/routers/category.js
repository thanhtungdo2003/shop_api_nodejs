import express from 'express';
import { create, getAll } from '../controllers/category';

const router = express.Router();

router.post(`/create`, create);
router.get(`/get-all`, getAll);

export default router;