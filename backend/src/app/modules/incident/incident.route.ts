import { Router } from 'express';
import { IncidentController } from './incident.controller';
import { IncidentValidation } from './incident.validation';
import validateZodRequest from '../../middlewares/validate-zod-request';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodRequest(IncidentValidation.createAnIncidentZodSchema),
    IncidentController.createAnIncident,
  );

export const IncidentRoutes = router;
