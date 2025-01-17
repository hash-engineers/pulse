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

const updateACompanyById = catchAsync(async (req: Request, res: Response) => {
  const data = await CompanyService.updateACompanyById(req.params.id, req.body);

  sendResponse<Company>(res, {
    statusCode: 200,
    success: true,
    message: 'Company updated',
    data,
  });
});

const getACompanyByCustomerId = catchAsync(
  async (req: Request, res: Response) => {
    const data = await CompanyService.getACompanyByCustomerId(
      req.query.customerId as string,
    );

    sendResponse<Company>(res, {
      statusCode: 200,
      success: true,
      message: 'Company retrieved',
      data,
    });
  },
);

export const CompanyController = {
  createCompany,
  updateACompanyById,
  getACompanyByCustomerId,
};
