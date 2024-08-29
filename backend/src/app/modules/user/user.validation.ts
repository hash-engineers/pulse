import { z } from 'zod';
import { ERole } from '@prisma/client';

const createAnUserZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required!' }),
    name: z.string({ required_error: 'Name is required!' }),
    email: z.string({ required_error: 'Email is required!' }).email(),
    role: z
      .enum([...Object.values(ERole)] as [string, ...string[]])
      .default(ERole.SRE)
      .optional(),
    companyName: z.string({ required_error: 'Company name is required!' }),
  }),
});

export const UserValidation = { createAnUserZodSchema };
