import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../../utils/catch-async';
import sendResponse from '../../../utils/send-response';
import env from '../../../env';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { ...signUpData } = req.body;

  const result = await AuthService.signUp(signUpData);

  const { refreshToken, accessToken } = result;

  const cookieOptions = {
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
  };

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User signed up',
    data: true,
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const { ...signInData } = req.body;

  const result = await AuthService.signIn(signInData);

  const { refreshToken, accessToken } = result;

  const cookieOptions = {
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
  };

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User signed in',
    data: true,
  });
});

const google = catchAsync(async (req: Request, res: Response) => {
  const redirectUrl = req.query.redirectUrl;

  const authUrl = await AuthService.google(redirectUrl);

  res.redirect(authUrl);
});

const googleCallback = catchAsync(async (req: Request, res: Response) => {
  const code = req.query.code;

  const { refreshToken, accessToken } = await AuthService.googleCallback(code);

  const cookieOptions = {
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
  };

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);

  const redirectUrl =
    (req.query.state as string) ?? (env.DEFAULT_APP_REDIRECT_URL as string);

  res.redirect(redirectUrl);
});

export const AuthController = { signUp, signIn, google, googleCallback };
