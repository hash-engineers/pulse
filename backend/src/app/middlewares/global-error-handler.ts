/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import env from '../../env';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import ApiError from '../../errors/api-error';
import { GenericErrorMessage } from '../../interfaces/common';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import handleZodValidationError from '../../errors/handle-zod-validation-error';
import handlePrismaClientValidationError from '../../errors/handle-prisma-client-validation-error';
import handlePrismaClientKnownRequestError from '../../errors/handle-prisma-client-known-request-error';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  env.NODE_ENV === 'development' &&
    console.error('~~ 👽 globalErrorHandler 👽 ~~', error);

  let statusCode: number = 500;
  let message: string = 'Something went wrong';
  let errorMessages: GenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplefiedError = handlePrismaClientValidationError(error);

    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplefiedError = handleZodValidationError(error);

    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplefiedError = handlePrismaClientKnownRequestError(error);

    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: env.NODE_ENV !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
