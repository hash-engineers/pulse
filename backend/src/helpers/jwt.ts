import env from '../env';
import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  tokenType: 'access' | 'refresh',
): string => {
  if (tokenType === 'access') {
    return sign(payload, env.JWT_SECRET as Secret, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  } else {
    return sign(payload, env.JWT_REFRESH_SECRET as Secret, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });
  }
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return verify(token, secret) as JwtPayload;
};

export { createToken, verifyToken };
