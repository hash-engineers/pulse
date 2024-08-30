import { Router } from 'express';
import { CompanyValidation } from './company.validation';
import { CompanyController } from './company.controller';
import validateZodRequest from '../../middlewares/validate-zod-request';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodRequest(CompanyValidation.createCompanySchema),
    CompanyController.createCompany,
  )

  // UPDATE
  .patch('/:id', CompanyController.updateACompanyById);

export const CompanyRoutes = router;
