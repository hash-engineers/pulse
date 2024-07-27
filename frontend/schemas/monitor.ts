import { z } from 'zod';

const createMonitorSchema = z.object({
  url: z
    .string({ required_error: 'Url is required' })
    .min(6, { message: 'Enter your website url' }),
  whenToAlert: z.string({
    required_error: "Select when you'll notify",
  }),
  call: z.boolean().default(false).optional(),
  sendSMS: z.boolean().default(false).optional(),
  sendEmail: z.boolean().default(true).optional(),
  pushNotification: z.boolean().default(false).optional(),
  nextAction: z.string({
    required_error: 'Select what will be the next action',
  }),
});

export { createMonitorSchema };
