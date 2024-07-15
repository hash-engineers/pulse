import { Router } from 'express';
import { AuthRoutes } from './modules/auth/auth.route';

const router = Router();

[{ path: '/auth', route: AuthRoutes }].map(({ path, route }) =>
  router.use(path, route),
);

export const routes = router;
