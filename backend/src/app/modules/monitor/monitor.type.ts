import { Monitor } from '@prisma/client';
import { SearchTerm } from '../../../types/common';

type CreateAMonitorRequest = { userId: string } & Omit<
  Monitor,
  'statusCode' | 'status'
>;

type MonitorFilters = {
  id?: string;
  url?: string;
  name?: string;
  companyName?: string;
} & SearchTerm;

type UpdateAMonitorByIdRequest = Omit<
  Monitor,
  'id' | 'url' | 'companyName' | 'createdAt' | 'updatedAt'
>;

export { CreateAMonitorRequest, MonitorFilters, UpdateAMonitorByIdRequest };
