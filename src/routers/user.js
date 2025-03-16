import express from 'express';
import { login, auth, userRegister, logout } from '../controllers/user';
import authMiddleware from '../authMiddleware';

const router = express.Router();

router.post(`/login`, login);

router.post(`/register`, userRegister);

router.post(`/auth`,authMiddleware, auth);

router.post('/logout', logout)

export default router;