import { Router } from 'express';
import { CompanyRoutes } from './modules/company/company.route';

const router = Router();

[{ path: '/company', route: CompanyRoutes }].map(({ path, route }) =>
  router.use(path, route),
);

export const routes = router;
