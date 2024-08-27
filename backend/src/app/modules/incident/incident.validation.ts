import { z } from 'zod';

const createAnIncidentZodSchema = z.object({
  body: z.object({
    code: z.string({ required_error: 'Code is required!' }),
    statusCode: z.number().positive().optional(),
    statusMessage: z.string().optional(),
    monitorId: z.string({ required_error: 'Monitor id is required!' }),
  }),
});

export const IncidentValidation = { createAnIncidentZodSchema };
