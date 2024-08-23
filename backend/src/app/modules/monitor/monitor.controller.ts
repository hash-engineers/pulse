import pick from '../../../shared/pick';
import { Monitor } from '@prisma/client';
import { Request, Response } from 'express';
import { MonitorService } from './monitor.service';
import catchAsync from '../../../shared/catch-async';
import paginationFields from '../../../lib/pagination';
import sendResponse from '../../../shared/send-response';
import { monitorFilterableFields } from './monitor.constant';

const createAMonitor = catchAsync(async (req: Request, res: Response) => {
  const data = await MonitorService.createAMonitor(req.body);

  sendResponse<Monitor>(res, {
    statusCode: 200,
    success: true,
    message: 'Monitor created',
    data,
  });
});

const getMonitorById = catchAsync(async (req: Request, res: Response) => {
  const data = await MonitorService.getMonitorById(req.params.id);

  sendResponse<Monitor>(res, {
    statusCode: 200,
    success: true,
    message: 'Monitor retrieved',
    data,
  });
});

const getAllMonitors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, monitorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await MonitorService.getAllMonitors(
    filters,
    paginationOptions,
    req.body.userId,
  );

  sendResponse<Monitor[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All monitors retrieved',
    meta,
    data,
  });
});

export const MonitorController = {
  createAMonitor,
  getMonitorById,
  getAllMonitors,
};
