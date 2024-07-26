import { z } from 'zod';

const createMonitorSchema = z.object({
  body: z.object({
    url: z.string({ required_error: 'Url is required' }),
  }),
});

export const MonitorValidation = { createMonitorSchema };
