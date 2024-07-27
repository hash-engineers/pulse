import { Router } from 'express';
import { MonitorController } from './monitor.controller';
import { MonitorValidation } from './monitor.validation';
import validateZodRequest from '../../middlewares/validate-zod-request';

const router = Router();

router.post(
  '/create-monitor',
  validateZodRequest(MonitorValidation.createMonitorSchema),
  MonitorController.createMonitor,
);

export const MonitorRoutes = router;