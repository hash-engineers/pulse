import { Router } from 'express';
import { UserRoutes } from './modules/user/user.route';
import { CompanyRoutes } from './modules/company/company.route';
import { MonitorRoutes } from './modules/monitor/monitor.route';

const router = Router();

[
  { path: '/users', route: UserRoutes },
  { path: '/companies', route: CompanyRoutes },
  { path: '/monitors', route: MonitorRoutes },
].map(({ path, route }) => router.use(path, route));

export const routes = router;
