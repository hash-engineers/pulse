import { Router } from 'express';
import { IncidentController } from './incident.controller';

const router = Router();

router

  // WRITE
  .post('/', IncidentController.createAnIncident);

export const IncidentRoutes = router;
