/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../lib/prisma';
import { Monitor, Prisma } from '@prisma/client';
import ApiError from '../../../errors/api-error';
import { monitorSearchableFields } from './monitor.constant';
import { GenericResponse } from '../../../interfaces/common';
import calculatePagination from '../../../helpers/pagination';
import { PaginationOptions } from '../../../interfaces/pagination';
import { CreateMonitorRequest, MonitorFilters } from './monitor.type';

const createMonitor = async ({ userId, ...data }: CreateMonitorRequest) => {
  const isUrlExist = await prisma.monitor.findUnique({
    where: { url: data.url },
  });

  if (isUrlExist)
    throw new ApiError(409, 'Monitor already exists with this url');

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new ApiError(404, 'User not fond');

  if (data.name) {
    const isNameExist = await prisma.monitor.findFirst({
      where: { companyName: user.companyName, name: data.name },
    });

    if (isNameExist)
      throw new ApiError(409, 'Monitor already exists with this name');
  }

  data.companyName = user.companyName;

  const monitor = await prisma.monitor.create({ data });

  return monitor;
};

const getMonitorById = async (id: string) => {
  const monitor = await prisma.monitor.findUnique({ where: { id } });

  if (!monitor) throw new ApiError(404, 'Monitor not found');

  return monitor;
};

const getAllMonitors = async (
  { searchTerm, ...filterData }: MonitorFilters,
  paginationOptions: PaginationOptions,
  userId: string,
): Promise<GenericResponse<Monitor[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const pipeline = [];

  if (searchTerm) {
    pipeline.push({
      OR: monitorSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    pipeline.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new ApiError(404, 'User not found');

  const where: Prisma.MonitorWhereInput = {
    AND: [...pipeline, { companyName: user.companyName }],
  };

  const monitors = await prisma.monitor.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
  });

  const total = await prisma.monitor.count({ where });

  return { meta: { total, page, limit }, data: monitors };
};

export const MonitorService = {
  createMonitor,
  getMonitorById,
  getAllMonitors,
};
