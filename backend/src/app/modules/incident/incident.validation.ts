import { z } from 'zod';

const createAnIncidentZodSchema = z.object({
  body: z.object({
    code: z.string({ required_error: 'Code is required!' }),
    statusCode: z
      .number({ required_error: 'Status code is required!' })
      .positive(),
    statusMessage: z.string({ required_error: 'Status message is required!' }),
    monitorId: z.string({ required_error: 'Monitor id is required!' }),
  }),
});

export const IncidentValidation = { createAnIncidentZodSchema };
