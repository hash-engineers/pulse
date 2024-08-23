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

export { CreateAMonitorRequest, MonitorFilters };
