/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { Monitor } from '@prisma/client';

type CreateMonitorRequest = { userId: string } & Monitor;

type MonitorFilters = {
  searchTerm?: string;
  id?: string;
  url?: string;
  name?: string;
  companyName?: string;
};

export { CreateMonitorRequest, MonitorFilters };
