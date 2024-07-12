import { Prisma } from '@prisma/client';
import {
  GenericErrorMessage,
  GenericErrorResponse,
} from '../interfaces/common';

const handlePrismaClientKnownRequestError = (
  error: Prisma.PrismaClientKnownRequestError,
): GenericErrorResponse => {
  let message = '';
  let errors: GenericErrorMessage[] = [];

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) ?? 'record not found!';
    errors = [{ path: '', message }];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation'))
      message = 'delete failed!';
    errors = [{ path: '', message }];
  }

  return { statusCode: 400, message, errorMessages: errors };
};

export default handlePrismaClientKnownRequestError;
