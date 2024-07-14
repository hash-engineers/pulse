import { User } from '@prisma/client';
import prisma from '../../../lib/prisma';

const signUp = async (data: User) => {
  const user = await prisma.user.create({ data });

  return user;
};

export const AuthService = { signUp };
