import { ZodError, ZodIssue } from 'zod';
import {
  GenericErrorMessage,
  GenericErrorResponse,
} from '../interfaces/common';

const handleZodValidationError = (error: ZodError): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = error.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue?.message,
  }));

  return {
    statusCode: 400,
    message: 'zod validation error!',
    errorMessages: errors,
  };
};

export default handleZodValidationError;
