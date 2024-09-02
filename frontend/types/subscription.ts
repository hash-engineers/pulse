import { User } from './user';
import { Company } from './company';
import { CreatedAtAndUpdatedAt } from './common';
import { ESubscriptionPeriod, ESubscriptionPlan } from '@/enums/subscription';

export type Subscription = {
  id: string;

  plan: ESubscriptionPlan;
  period: ESubscriptionPeriod;

  userId: string;
  user: User;

  companyId: string;
  company: Company;

  startDate: string;
  endDate: string;
} & CreatedAtAndUpdatedAt;
