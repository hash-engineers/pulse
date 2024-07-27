import { Router } from 'express';
import { CompanyRoutes } from './modules/company/company.route';
import { MonitorRoutes } from './modules/monitor/monitor.route';

const router = Router();

[
  { path: '/company', route: CompanyRoutes },
  { path: '/monitor', route: MonitorRoutes },
].map(({ path, route }) => router.use(path, route));

export const routes = router;
