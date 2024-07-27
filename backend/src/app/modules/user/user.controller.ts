import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getUserById(req.params.id);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved',
    data,
  });
});

export const UserController = { getUserById };
