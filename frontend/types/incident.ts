import { Monitor } from './monitor';
import { CreatedAtAndUpdatedAt } from './common';

type Incident = {
  id: string;

  statusCode: number;

  monitorId: string;
  monitor: Monitor;

  resolvedAt: string;
} & CreatedAtAndUpdatedAt;

export type { Incident };
