import { Company } from './company';
import { ERole } from '@/enums/user';
import { CreatedAtAndUpdatedAt } from './common';

type User = {
  id: string;
  name: string;
  email: string;
  role: ERole;

  companyName: string;
  company: Company;
} & CreatedAtAndUpdatedAt;

export type { User };
