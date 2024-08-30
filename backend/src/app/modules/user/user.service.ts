import { User } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { DB } from '../../../types/prisma';
import ApiError from '../../../errors/api-error';
// import sendMail from '../../../shared/send-mail';
import { CreateAnUserRequest } from './user.type';
// import welcomeMail from '../../../email-templates/welcome-mail';
// import { welcomeMailSubject } from '../../../email-templates/mail-subjects';

const createAnUser = async (
  db: DB,
  data: CreateAnUserRequest,
): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({ where: { id: data.id } });

  if (isUserExist)
    throw new ApiError(409, 'User already exist with this user id!');

  const user = await db.user.create({ data });

  if (!user) throw new ApiError(500, 'Failed to create user!');

  // sendMail({
  //   to: user.email,
  //   subject: welcomeMailSubject,
  //   body: welcomeMail({ username: user.name }),
  // });

  return user;
};

const getAnUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new ApiError(404, 'User not found!');

  return user;
};

const getAnUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new ApiError(404, 'User not found!');

  return user;
};

export const UserService = { createAnUser, getAnUserById, getAnUserByEmail };
