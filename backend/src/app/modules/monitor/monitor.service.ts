import { Monitor } from '@prisma/client';
import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';

const createMonitor = async (data: Monitor) => {
  const isExist = await prisma.monitor.findUnique({ where: { url: data.url } });

  if (isExist) throw new ApiError(409, 'Monitor already exists with this url.');

  const monitor = await prisma.monitor.create({ data });

  return monitor;
};

export const MonitorService = { createMonitor };
