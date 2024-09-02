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

const getAMonitorById = catchAsync(async (req: Request, res: Response) => {
  const data = await MonitorService.getAMonitorById(req.params.id);

  sendResponse<Monitor>(res, {
    statusCode: 200,
    success: true,
    message: 'Monitor retrieved',
    data,
  });
});

const getAMonitorByIdWithFilteredIncidents = catchAsync(
  async (req: Request, res: Response) => {
    const data = await MonitorService.getAMonitorByIdWithFilteredIncidents(
      req.params.id,
      req.query.incidentStartAt as string,
    );

    sendResponse<Monitor>(res, {
      statusCode: 200,
      success: true,
      message: 'Monitor retrieved',
      data,
    });
  },
);

const getAllMonitors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, monitorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await MonitorService.getAllMonitors(
    filters,
    paginationOptions,
    req.query.userId as string,
  );

  sendResponse<Monitor[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All monitors retrieved',
    meta,
    data,
  });
});

const updateAMonitorById = catchAsync(async (req: Request, res: Response) => {
  const data = await MonitorService.updateAMonitorById(req.params.id, req.body);

  sendResponse<Monitor>(res, {
    statusCode: 200,
    success: true,
    message: 'Monitor updated',
    data,
  });
});

export const MonitorController = {
  createAMonitor,
  getAllMonitors,
  getAMonitorById,
  updateAMonitorById,
  getAMonitorByIdWithFilteredIncidents,
};
