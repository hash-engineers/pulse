import { z } from 'zod';
import { User } from './user';
import { Monitor } from './monitor';
import { Subscription } from './subscription';
import { ECompanySize } from '@/enums/company';
import { CreatedAtAndUpdatedAt } from './common';
import { createCompanySchema } from '@/schemas/company';

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

type Company = {
  id: string;

  name: string;
  size: ECompanySize;
  customerId?: string;

  subscription?: Subscription;

  members: User[];
  monitors: Monitor[];
} & CreatedAtAndUpdatedAt;

export type { CreateCompanyFormData, Company };
