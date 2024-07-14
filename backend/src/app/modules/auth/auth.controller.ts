import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signUp(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User signed up',
    data: result,
  });
});

export const AuthController = { signUp };
