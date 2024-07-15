import express from 'express';
import { PaymentController } from './controller';

const router = express.Router();

router.post('/init-subscription', PaymentController.initSubscriptionPayment);

router.post('/init-order', PaymentController.initOrderPayment);

router.post('/ipn', PaymentController.validatePayment);

export const PaymentRoutes = router;
