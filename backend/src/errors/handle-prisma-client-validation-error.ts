import { Prisma } from '@prisma/client';
import { GenericErrorResponse } from '../types/common';

const handlePrismaClientValidationError = (
  error: Prisma.PrismaClientValidationError,
): GenericErrorResponse => {
  const errors = [{ path: '', message: error.message }];

  return {
    statusCode: 400,
    message: 'prisma client validation error!',
    errorMessages: errors,
  };
};

export default handlePrismaClientValidationError;
