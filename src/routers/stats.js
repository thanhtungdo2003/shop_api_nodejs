import express from 'express';
import { adminAuthMiddleware } from '../authMiddleware';
import { getAmountOfProductSaleByRangeOfTime, getOrderByRangeOfTime, getRevenueByRangeOfTime, getTopCateByRangeOfTime, getUserRegByRangeOfTime } from '../controllers/stats';

const router = express.Router();

router.post(`/get-revenue-by-rangeoftime`, getRevenueByRangeOfTime);
router.post(`/get-user-reg-by-rangeoftime`, getUserRegByRangeOfTime);
router.post(`/get-orders-by-rangeoftime`, getOrderByRangeOfTime);
router.post(`/get-top-cate-by-rangeoftime`, getTopCateByRangeOfTime);
router.post(`/get-amount-of-product-sale-by-rangeoftime`, getAmountOfProductSaleByRangeOfTime);

export default router;