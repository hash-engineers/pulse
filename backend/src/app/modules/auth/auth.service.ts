/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../lib/prisma';
import env from '../../../env';
import ApiError from '../../../errors/api-error';
import { createToken } from '../../../helpers/jwt';
import { matchPassword } from '../../../helpers/bcrypt';

const signUp = async (payload: any): Promise<any> => {
  const user = await prisma.user.create({ data: payload });

  const { email, role } = user;

  const accessToken = createToken({ email, role }, 'access');

  const refreshToken = createToken({ email, role }, 'refresh');

  return {
    accessToken,
    refreshToken,
  };
};

const signIn = async (payload: any): Promise<any> => {
  const { email, password } = payload;

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  const { role } = user;

  const isPasswordMatched = await matchPassword(password, password as string);

  if (!isPasswordMatched) {
    throw new ApiError(401, 'Password is incorrect!');
  }

  const accessToken = createToken({ email, role }, 'access');

  const refreshToken = createToken({ email, role }, 'refresh');

  return {
    accessToken,
    refreshToken,
  };
};

const google = async (payload: any) => {
  const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
  const clientId = env.GOOGLE_CLIENT_ID;
  const responseType = 'code';
  const redirectUri = `${env.BASE_URL}/auth/google/callback`;
  const scope = 'email profile';
  const accessType = 'offline';
  const redirectUrl = payload ?? env.DEFAULT_APP_REDIRECT_URL;
  const authUrl = `${GOOGLE_AUTH_ENDPOINT}?response_type=${responseType}&client_id=${encodeURIComponent(
    clientId,
  )}&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&scope=${scope}&access_type=${accessType}&state=${redirectUrl}`;

  return authUrl;
};

const googleCallback = async (code: any) => {
  if (!code) {
    throw new ApiError(403, 'Authorization code is required');
  }

  const requestBody = new URLSearchParams({
    code,
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${env.BASE_URL}/auth/google/callback`,
    grant_type: 'authorization_code',
  });

  // Exchange tokens on code.
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  });

  const tokens = await tokenResponse.json();
  const gAccessToken = tokens.access_token;

  const userResponse = await fetch(
    'https://www.googleapis.com/oauth2/v1/userinfo',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${gAccessToken}`,
      },
    },
  );

  const googleUser = await userResponse.json();

  const { email } = googleUser;

  if (!email) {
    throw new ApiError(500, 'Failed to fetch user email');
  }

  let user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: googleUser.given_name,
        email,
      },
    });
  }

  const { role } = user;

  const accessToken = createToken({ email, role }, 'access');

  const refreshToken = createToken({ email, role }, 'refresh');

  return {
    accessToken,
    refreshToken,
  };
};
export const AuthService = { signUp, signIn, google, googleCallback };
