import cors from 'cors';
// import './app/schedules';
import { routes } from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/global-error-handler';
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

/*================ MIDDLEWARES ================*/
app.use(cors());

/*================ PARSERS ================*/
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*================ ROUTES ================*/
app.use('/api/v1', routes);

/*================ GLOBAL ERROR HANDLER ================*/
app.use(globalErrorHandler);

/*================ TEST ROUTE ================*/
app.get('/test', (_: Request, res: Response) => {
  res.json('Pulse Server On Fire 🔥 💧 🔥');
});

/*================ HANDLE NOT FOUND ================*/
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not found!',
    errorMessages: [{ path: req.originalUrl, message: 'Api not found!' }],
  });

  next();
});

export default app;
