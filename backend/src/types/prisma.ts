import { PrismaClient } from '@prisma/client';

type DB = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export { DB };
