import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { CreateMonitorRequest } from './monitor.type';

const createMonitor = async ({ userId, ...data }: CreateMonitorRequest) => {
  console.log(userId, 'sdddddddddddddd');
  const isExist = await prisma.monitor.findUnique({ where: { url: data.url } });

  if (isExist) throw new ApiError(409, 'Monitor already exists with this url.');

  const user = await prisma.user.findUnique({ where: { id: userId } });

  data.companyName = user!.companyName;

  const monitor = await prisma.monitor.create({ data });

  return monitor;
};

const getMonitorById = async (id: string) => {
  const monitor = await prisma.monitor.findUnique({ where: { id } });

  if (!monitor) throw new ApiError(404, 'Monitor not found');

  return monitor;
};

const getAllMonitors = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new ApiError(404, 'User not found!');

  const monitors = await prisma.monitor.findMany({
    where: { companyName: user.companyName },
  });

  return monitors;
};

export const MonitorService = {
  createMonitor,
  getMonitorById,
  getAllMonitors,
};
