import express from 'express';
import { addProduct, deleteProduct, getNews, getProductById, getProductByParams, getProducts, updateProduct } from '../controllers/product';
import { getFile, uploadImgs } from '../storage/storage';

const router = express.Router();

router.get(`/products/get-all`, getProducts);
router.get(`/products/:id`, getProductById);
router.get(`/products/get-new/:row/:page`, getNews);
router.post(`/products-get-by-params`, getProductByParams);
router.get(`/product/get-imgs/:dirpath/:filename`, getFile);
router.post(`/products-add`, uploadImgs("D:/shopmt/product_imgs"), addProduct);
router.post(`/product/update`, uploadImgs("D:/shopmt/product_imgs"), updateProduct);
router.delete(`/products/:id`, deleteProduct);

export default router;