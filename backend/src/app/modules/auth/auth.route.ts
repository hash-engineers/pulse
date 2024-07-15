import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/sign-up', AuthController.signUp);

router.post('/sign-in', AuthController.signUp);

router.get('/google', AuthController.google);

router.get('/google/callback', AuthController.googleCallback);

export const AuthRoutes = router;
