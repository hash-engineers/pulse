import { Router } from 'express';
import { UserRoutes } from './modules/user/user.route';
import { CompanyRoutes } from './modules/company/company.route';
import { MonitorRoutes } from './modules/monitor/monitor.route';

const router = Router();

[
  { path: '/users', route: UserRoutes },
  { path: '/monitors', route: MonitorRoutes },
  { path: '/companies', route: CompanyRoutes },
].map(({ path, route }) => router.use(path, route));

export const routes = router;
