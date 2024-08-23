import { z } from 'zod';
import { Monitor } from './monitor';
import { ECompanySize } from '@/enums/company';
import { CreatedAtAndUpdatedAt } from './common';
import { createCompanySchema } from '@/schemas/company';

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

type Company = {
  name: string;
  size: ECompanySize;

  members: [];
  monitors: Monitor[];
} & CreatedAtAndUpdatedAt;

export type { CreateCompanyFormData, Company };
