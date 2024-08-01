import { ENextAction, EWhenToAlert, EMonitorStatus } from '@/enums/monitor';

type Monitor = {
  id: string;
  url: string;
  name?: string;
  status: EMonitorStatus;
  downTime: number;
  call: boolean;
  sendSMS: boolean;
  sendEmail: boolean;
  pushNotification: boolean;
  whenToAlert: EWhenToAlert;
  nextAction: ENextAction;

  incidents: [];

  companyName: string;
  company: any;

  checkedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type { Monitor };
