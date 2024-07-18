import { z } from 'zod';

const createCompanySchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Name should be at least 2 charactor' })
    .max(255, { message: "Name shouldn't be more than 255 charactor" }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide the valid email' }),
  company: z
    .string({ required_error: 'Company name is required' })
    .min(2, { message: 'Company name should be at least 2 charactor' }),
  size: z
    .string({ required_error: 'Company size is required' })
    .min(1, { message: 'Company size should be at least 1' }),
});

export { createCompanySchema };
