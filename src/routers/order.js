import express from 'express';
import { create } from '../controllers/order';

const router = express.Router();

router.post(`/create`, create);

export default router;