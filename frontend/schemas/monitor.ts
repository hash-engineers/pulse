import { z } from 'zod';
import { whenDoesNotAcknowledge, whenToAlert } from '@/lib/monitor';

const createMonitorSchema = z.object({
  url: z
    .string({ required_error: 'Url is required' })
    .min(6, { message: 'Enter your website url' }),
  whenToAlert: z.enum([...whenToAlert] as [string, ...string[]], {
    required_error: "Select when you'll notify",
  }),
  call: z.boolean().optional(),
  sendSMS: z.boolean().optional(),
  sendEmail: z.boolean().optional().default(true),
  pushNotification: z.boolean().optional(),
  whenDoesNotAcknowledge: z.enum(
    [...whenDoesNotAcknowledge] as [string, ...string[]],
    {
      required_error: 'Select wtat will be next action',
    }
  ),
});

export { createMonitorSchema };
