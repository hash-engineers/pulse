/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { userAgentHeader } from '../../../lib/headers';
import { EStatus, Monitor, Prisma } from '@prisma/client';
import { monitorSearchableFields } from './monitor.constant';
import { GenericResponse } from '../../../types/common';
import calculatePagination from '../../../helpers/pagination';
import { PaginationOptions } from '../../../types/pagination';
import { CreateAMonitorRequest, MonitorFilters } from './monitor.type';

const createAMonitor = async ({ userId, ...data }: CreateAMonitorRequest) => {
  let isUrlValid = null;

  try {
    isUrlValid = await axios.get(data.url, {
      headers: { 'User-Agent': userAgentHeader },
    });
  } catch (error: any) {
    if (error?.code === 'ENOTFOUND' || error?.code === 'ERR_BAD_RESPONSE')
      throw new ApiError(400, 'Provide a valid url!');
  }

  if (!isUrlValid) throw new ApiError(400, 'Url is not valid!');

  const isUrlExist = await prisma.monitor.findUnique({
    where: { url: data.url, companyName: data.companyName },
  });

  if (isUrlExist)
    throw new ApiError(409, 'Monitor already exists with this url!');

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new ApiError(404, 'User not found!');

  if (data.name) {
    const isNameExist = await prisma.monitor.findFirst({
      where: { companyName: user.companyName, name: data.name },
    });

    if (isNameExist)
      throw new ApiError(409, 'Monitor already exists with this name!');
  }

  data.companyName = user.companyName;

  const monitor = await prisma.monitor.create({
    data: {
      statusCode: isUrlValid.status,
      status: isUrlValid.statusText === 'OK' ? EStatus.UP : EStatus.PENDING,
      ...data,
    },
  });

  return monitor;
};

const getAMonitorById = async (id: string, startDateString?: string) => {
  let startDate = null;
  let monitor: Monitor | null;

  if (startDateString) {
    startDate = new Date(startDateString);

    monitor = await prisma.monitor.findUnique({
      where: { id },
      include: { incidents: { where: { createdAt: { gte: startDate } } } },
    });
  } else {
    monitor = await prisma.monitor.findUnique({
      where: { id },
      include: { incidents: true },
    });
  }

  if (!monitor) throw new ApiError(404, 'Monitor not found!');

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

  if (!user) throw new ApiError(404, 'User not found!');

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
  createAMonitor,
  getAllMonitors,
  getAMonitorById,
};
