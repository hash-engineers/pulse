import { Monitor } from '@prisma/client';
import { Request, Response } from 'express';
import { MonitorService } from './monitor.service';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';

const createMonitor = catchAsync(async (req: Request, res: Response) => {
  const data = await MonitorService.createMonitor(req.body);

  sendResponse<Monitor>(res, {
    statusCode: 200,
    success: true,
    message: 'Monitor created',
    data,
  });
});

const getMonitorById = catchAsync(async (req: Request, res: Response) => {
  const data = await MonitorService.getMonitorById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Monitor retrieved',
    data,
  });
});

const getAllMonitors = catchAsync(async (req: Request, res: Response) => {
  const data = await MonitorService.getAllMonitors(req.body.userId);

  sendResponse<Monitor[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All monitors retrieved',
    data,
  });
});

export const MonitorController = {
  createMonitor,
  getMonitorById,
  getAllMonitors,
};
