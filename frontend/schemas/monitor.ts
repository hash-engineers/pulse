import { z } from 'zod';
import { ENextAction, EWhenToAlert } from '@/enums/monitor';

const createMonitorSchema = z.object({
  userId: z
    .string({ required_error: 'User id is required' })
    .min(1, { message: 'User id should be at least one charactor' }),
  url: z
    .string({ required_error: 'Url is required' })
    .min(6, { message: 'Enter your website url' }),
  whenToAlert: z
    .enum([...Object.values(EWhenToAlert)] as [string, ...string[]], {
      required_error: "Select when you'll notify",
    })
    .default(EWhenToAlert.URL_BECOMES_UNAVAILABLE),
  call: z.boolean().default(false).optional(),
  sendSMS: z.boolean().default(false).optional(),
  sendEmail: z.boolean().default(true).optional(),
  pushNotification: z.boolean().default(false).optional(),
  nextAction: z
    .enum([...Object.values(ENextAction)] as [string, ...string[]], {
      required_error: 'Select what will be the next action',
    })
    .default(ENextAction.WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS),
});

export { createMonitorSchema };
