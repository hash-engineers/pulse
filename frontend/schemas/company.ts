import { z } from 'zod';
import { ECompanySize } from '@/enums/company';

const createCompanySchema = z.object({
  id: z
    .string({ required_error: 'Id is requried' })
    .min(1, { message: 'Id should be at least one charactor' }),
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Name should be at least 2 charactor' })
    .max(255, { message: "Name shouldn't be more than 255 charactor" }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide the valid email' }),
  companyName: z
    .string({ required_error: 'Company name is required' })
    .min(2, { message: 'Company name should be at least 2 charactor' }),
  size: z
    .enum([...(Object.values(ECompanySize) as [string, ...string[]])], {
      required_error: 'Company size is required',
    })
    .default(ECompanySize.JUST__ME),
});

export { createCompanySchema };
