import express from 'express';
import { create, getByParams, momoPay, updateStatus } from '../controllers/order';
import { adminAuthMiddleware } from '../authMiddleware';

const router = express.Router();

router.post(`/create`, create);
router.post(`/create-with-momo`, momoPay);
router.post(`/get-by-params`, getByParams);
router.post(`/update-status`, updateStatus);

export default router;