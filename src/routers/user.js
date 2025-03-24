import express from 'express';
import { login, auth, userRegister, logout, getWithParams, update, addPerm, setStatus } from '../controllers/user';
import authMiddleware, { adminAuthMiddleware, userAuthMiddleware } from '../authMiddleware';

const router = express.Router();

router.post(`/login`, login);

router.post(`/register`, userRegister);

router.post(`/get-by-params`, userAuthMiddleware, getWithParams);

router.post(`/update`, userAuthMiddleware, update);

router.post(`/add-perm`, adminAuthMiddleware, addPerm);

router.post(`/set-status`, adminAuthMiddleware, setStatus);

router.post(`/auth`, authMiddleware, auth);

router.post('/logout', logout)

export default router;