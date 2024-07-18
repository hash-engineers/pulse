import { Company } from '@prisma/client';
import { Request, Response } from 'express';
import { CompanyService } from './company.service';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';

const createCompany = catchAsync(async (req: Request, res: Response) => {
  const data = await CompanyService.createCompany(req.body);

  sendResponse<Company>(res, {
    statusCode: 200,
    success: true,
    message: 'Company created',
    data,
  });
});

export const CompanyController = { createCompany };
