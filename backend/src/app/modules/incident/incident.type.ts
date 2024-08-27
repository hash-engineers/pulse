import { Incident } from '@prisma/client';

type CreateAnIncidentRequest = Pick<
  Incident,
  'code' | 'statusCode' | 'statusMessage' | 'monitorId'
>;

export { CreateAnIncidentRequest };
