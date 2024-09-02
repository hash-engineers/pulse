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
  .get('/:id', MonitorController.getAMonitorById)
  .get(
    '/filtered-incidents/:id',
    MonitorController.getAMonitorByIdWithFilteredIncidents,
  )

  // UPDATE
  .patch(
    '/:id',
    validateZodRequest(MonitorValidation.updateAMonitorByIdZodSchema),
    MonitorController.updateAMonitorById,
  );

export const MonitorRoutes = router;
