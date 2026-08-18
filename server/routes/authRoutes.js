import express from 'express';
import { adminLogin, delegateLogin, adminLogout, delegateLogout } from '../controllers/authController.js';

const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/admin/logout', adminLogout);

router.post('/delegate/login', delegateLogin);
router.post('/delegate/logout', delegateLogout);

export default router;
