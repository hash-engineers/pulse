import { User } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { DB } from '../../../types/prisma';
import ApiError from '../../../errors/api-error';
import { CreateAnUserRequest } from './user.type';

const createAnUser = async (
  db: DB,
  data: CreateAnUserRequest,
): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({ where: { id: data.id } });

  if (isUserExist)
    throw new ApiError(409, 'User already exist with this user id!');

  const user = await db.user.create({ data });

  if (!user) throw new ApiError(500, 'Failed to create user!');

  return user;
};

const getAnUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new ApiError(404, 'User not found!');

  return user;
};

export const UserService = { createAnUser, getAnUserById };
