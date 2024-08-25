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

export type { Monitor };
