import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router

  // READ
  .get('/:id', UserController.getAnUserById);

export const UserRoutes = router;
