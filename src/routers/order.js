import express from 'express';
import { create, getByParams } from '../controllers/order';

const router = express.Router();

router.post(`/create`, create);
router.post(`/get-by-params`, getByParams);

export default router;