import { z } from 'zod';
import { Company } from './company';
import { Incident } from './incident';
import { CreatedAtAndUpdatedAt } from './common';
import { createAMonitorZodSchema } from '@/schemas/monitor';
import { ENextAction, EWhenToAlert, EMonitorStatus } from '@/enums/monitor';

export type Monitor = {
  id: string;

  url: string;
  name?: string;
  statusCode: number;
  status: EMonitorStatus;
  downTime: number;
  call: boolean;
  sendSMS: boolean;
  sendEmail: boolean;
  pushNotification: boolean;
  whenToAlert: EWhenToAlert;
  nextAction: ENextAction;

  incidents: Incident[];

  companyName: string;
  company: Company;

  checkedAt?: string;
} & CreatedAtAndUpdatedAt;

export type MonitorDetailsTableRow<T extends string> = {
  id: string;
  downtime: string;
  timePeriod:
    | 'Today'
    | 'Last 7 days'
    | 'Last 30 days'
    | 'Last 365 days'
    | `Since ${T} untill today`;
  availability: string;
  incidents: number;
  longestIncident: string;
  averageIncident: string;
};

export type CreateAMonitor = z.infer<typeof createAMonitorZodSchema>;
