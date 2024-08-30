import { Company } from './company';
import { CreatedAtAndUpdatedAt } from './common';
import { ESubscriptionPeriod, ESubscriptionPlan } from '@/enums/subscription';

type Subscription = {
  id: string;

  plan: ESubscriptionPlan;
  period: ESubscriptionPeriod;

  companyName: string;
  company: Company;

  startDate: string;
  endDate: string;
} & CreatedAtAndUpdatedAt;

export type { Subscription };
