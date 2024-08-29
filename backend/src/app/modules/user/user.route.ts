import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateZodRequest from '../../middlewares/validate-zod-request';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodRequest(UserValidation.createAnUserZodSchema),
    UserController.createAnUser,
  )

  // READ
  .get('/:id', UserController.getAnUserById);

export const UserRoutes = router;
