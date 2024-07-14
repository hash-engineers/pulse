import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateZodRequest from '../../middlewares/validate-zod-request';

const router = Router();

router.post(
  '/sign-up',
  validateZodRequest(AuthValidation.signUp),
  AuthController.signUp,
);

export const AuthRoutes = router;
