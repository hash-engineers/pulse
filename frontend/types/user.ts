import { Company } from './company';
import { ERole } from '@/enums/user';
import { Subscription } from './subscription';
import { CreatedAtAndUpdatedAt } from './common';

type User = {
  id: string;

  name: string;
  email: string;
  role: ERole;

  subscription?: Subscription;

  companyName: string;
  company: Company;
} & CreatedAtAndUpdatedAt;

export type { User };
