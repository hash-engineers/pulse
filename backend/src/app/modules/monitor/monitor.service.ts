import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { CreateMonitorRequest } from './monitor.type';

const createMonitor = async ({ userId, ...data }: CreateMonitorRequest) => {
  const isExist = await prisma.monitor.findUnique({ where: { url: data.url } });

  if (isExist) throw new ApiError(409, 'Monitor already exists with this url.');

  const user = await prisma.user.findUnique({ where: { id: userId } });

  data.companyName = user!.companyName;

  const monitor = await prisma.monitor.create({ data });

  return monitor;
};

export const MonitorService = { createMonitor };
