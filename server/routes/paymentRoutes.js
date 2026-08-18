import express from 'express';
import { submitPayment, getPaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', submitPayment);
router.get('/:registrationId', getPaymentStatus);

export default router;
