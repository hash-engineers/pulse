import { Request, Response } from 'express';
import catchAsync from '../../../shared/catch-async';
import { IncidentService } from './incident.service';
import sendResponse from '../../../shared/send-response';
import { Incident } from '@prisma/client';

const createAnIncident = catchAsync(async (req: Request, res: Response) => {
  const data = await IncidentService.createAnIncident(req.body);

  sendResponse<Incident>(res, {
    statusCode: 200,
    success: true,
    message: 'Incident created',
    data,
  });
});

export const IncidentController = { createAnIncident };
