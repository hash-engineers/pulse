import { Monitor } from '@prisma/client';

type CreateMonitorRequest = { userId: string } & Monitor;

export { CreateMonitorRequest };
