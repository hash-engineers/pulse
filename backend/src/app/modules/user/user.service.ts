import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new ApiError(404, 'User not found');

  return user;
};

export const UserService = { getUserById };
