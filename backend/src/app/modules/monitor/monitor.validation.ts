import { z } from 'zod';
import { ENextAction, EWhenToAlert } from '@prisma/client';

const createMonitorSchema = z.object({
  body: z.object({
    url: z.string({ required_error: 'Url is required' }),
    call: z.boolean().default(false).optional(),
    sendSMS: z.boolean().default(false).optional(),
    sendEmail: z.boolean().default(true).optional(),
    pushNotification: z.boolean().default(false).optional(),
    whenToAlert: z.enum(
      [...Object.values(EWhenToAlert)] as [string, ...string[]],
      {
        required_error: 'When to alert, when occurs a incidents is required',
      },
    ),
    nextAction: z.enum(
      [...Object.values(ENextAction)] as [string, ...string[]],
      {
        required_error:
          "What will be the next action if on call person doesn't acknowledge",
      },
    ),
  }),
});

export const MonitorValidation = { createMonitorSchema };
