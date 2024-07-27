import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/:id', UserController.getUserById);

export const UserRoutes = router;
