import { z } from 'zod';
import { EIncidentStatus } from '@prisma/client';

const createAnIncidentZodSchema = z.object({
  body: z.object({
    code: z.string({ required_error: 'Code is required!' }),
    statusCode: z.number().positive().optional(),
    statusMessage: z.string().optional(),
    status: z
      .enum([...Object.values(EIncidentStatus)] as [string, ...string[]])
      .default(EIncidentStatus.ONGOING)
      .optional(),
    monitorId: z.string({ required_error: 'Monitor id is required!' }),
  }),
});

export const IncidentValidation = { createAnIncidentZodSchema };
