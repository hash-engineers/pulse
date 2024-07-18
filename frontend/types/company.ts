import { z } from 'zod';
import { createCompanySchema } from '@/schemas/company';

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

export type { CreateCompanyFormData };
