import { Router } from 'express';
import { SubscriptionController } from './subscription.controller';

const router = Router();

router

  // WRITE
  .post('/', SubscriptionController.createOrUpdateASubscription);

export const SubscriptionRoutes = router;
