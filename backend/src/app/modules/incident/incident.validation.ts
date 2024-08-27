import { z } from 'zod';

const createAnIncidentZodSchema = z.object({
  body: z.object({
    monitorId: z.string({ required_error: 'Monitor id is required!' }),
  }),
});

export const IncidentValidation = { createAnIncidentZodSchema };
