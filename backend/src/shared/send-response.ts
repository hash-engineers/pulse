import { Response } from 'express';
import { Meta } from '../types/common';

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: Meta;
  data?: T | null;
};

const sendResponse = <T>(
  res: Response,
  { statusCode, success, message, meta, data }: ApiResponse<T>,
): void => {
  const responseData: ApiResponse<T> = {
    statusCode,
    success,
    message: message ?? null,
    meta: meta ?? null ?? undefined,
    data: data ?? null ?? undefined,
  };

  res.status(statusCode).json(responseData);
};

export default sendResponse;
