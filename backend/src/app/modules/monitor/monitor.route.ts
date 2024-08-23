import { Router } from 'express';
import { MonitorController } from './monitor.controller';
import { MonitorValidation } from './monitor.validation';
import validateZodRequest from '../../middlewares/validate-zod-request';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodRequest(MonitorValidation.createAMonitorZodSchema),
    MonitorController.createAMonitor,
  )

  // READ
  .get('/', MonitorController.getAllMonitors)
  .get('/:id', MonitorController.getMonitorById);

export const MonitorRoutes = router;
