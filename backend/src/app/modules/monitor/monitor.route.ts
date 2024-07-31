import { Router } from 'express';
import { MonitorController } from './monitor.controller';
import { MonitorValidation } from './monitor.validation';
import validateZodRequest from '../../middlewares/validate-zod-request';

const router = Router();

router
  .post(
    '/',
    validateZodRequest(MonitorValidation.createMonitorSchema),
    MonitorController.createMonitor,
  )
  .get('/', MonitorController.getAllMonitors)
  .get('/:id', MonitorController.getMonitorById);

export const MonitorRoutes = router;
