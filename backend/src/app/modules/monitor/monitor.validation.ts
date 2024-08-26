import { z } from 'zod';
import { ENextAction, EWhenToAlert, EMonitorStatus } from '@prisma/client';

const createAMonitorZodSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User id is required!' }),
    name: z.string().optional(),
    url: z.string({ required_error: 'Url is required!' }),
    call: z.boolean().default(false).optional(),
    sendSMS: z.boolean().default(false).optional(),
    sendEmail: z.boolean().default(true).optional(),
    pushNotification: z.boolean().default(false).optional(),
    whenToAlert: z
      .enum([...Object.values(EWhenToAlert)] as [string, ...string[]], {
        required_error: 'When to alert, when occurs a incidents is required!',
      })
      .default(EWhenToAlert.URL_BECOMES_UNAVAILABLE),
    nextAction: z
      .enum([...Object.values(ENextAction)] as [string, ...string[]], {
        required_error:
          "What will be the next action if on call person doesn't acknowledge!",
      })
      .default(ENextAction.WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS),
  }),
});

const updateAMonitorByIdZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    statusCode: z.number().positive().optional(),
    status: z
      .enum([...Object.values(EMonitorStatus)] as [string, ...string[]])
      .optional(),
    downtime: z.number().optional(),
    call: z.boolean().optional(),
    sendSMS: z.boolean().optional(),
    sendEmail: z.boolean().optional(),
    pushNotification: z.boolean().optional(),
    whenToAlert: z
      .enum([...Object.values(EWhenToAlert)] as [string, ...string[]])
      .optional(),
    nextAction: z
      .enum([...Object.values(ENextAction)] as [string, ...string[]])
      .optional(),
    checkedAt: z.string().datetime().optional(),
  }),
});

export const MonitorValidation = {
  createAMonitorZodSchema,
  updateAMonitorByIdZodSchema,
};
