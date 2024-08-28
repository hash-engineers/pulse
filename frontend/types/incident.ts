import { Monitor } from './monitor';
import { CreatedAtAndUpdatedAt } from './common';
import { EIncidentStatus } from '@/enums/incident';

type Incident = {
  id: string;

  code: string;
  statusCode?: number;
  statusMessage?: string;
  status: EIncidentStatus;

  monitorId: string;
  monitor: Monitor;

  resolvedAt?: string;
} & CreatedAtAndUpdatedAt;

export type { Incident };
