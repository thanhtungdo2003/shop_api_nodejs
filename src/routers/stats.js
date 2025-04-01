import express from 'express';
import { adminAuthMiddleware } from '../authMiddleware';
import { getAmountOfProductSaleByRangeOfTime, getRevenueByRangeOfTime, getUserRegByRangeOfTime } from '../controllers/stats';

const router = express.Router();

router.post(`/get-revenue-by-rangeoftime`, getRevenueByRangeOfTime);
router.post(`/get-user-reg-by-rangeoftime`, getUserRegByRangeOfTime);
router.post(`/get-amount-of-product-sale-by-rangeoftime`, getAmountOfProductSaleByRangeOfTime);

export default router;