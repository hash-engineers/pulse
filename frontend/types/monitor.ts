import { Company } from './company';
import { Incident } from './incident';
import { CreatedAtAndUpdatedAt } from './common';
import { ENextAction, EWhenToAlert, EMonitorStatus } from '@/enums/monitor';

type Monitor = {
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

type MonitorDetailsTableRow = {
  id: string;
  downtime: string;
  timePeriod:
    | 'Today'
    | 'Last 7 days'
    | 'Last 30 days'
    | 'Last 365 days'
    | 'All Time (Last 3 days)'
    | 'Since 12 July 2024 untill today';
  availability: string;
  incidents: number;
  longestIncident: string;
  averageIncident: string;
};

export type { Monitor, MonitorDetailsTableRow };
