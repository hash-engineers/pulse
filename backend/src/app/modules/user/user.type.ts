import { User } from '@prisma/client';

type CreateAnUserRequest = Pick<User, 'id' | 'name' | 'email' | 'companyName'>;

export { CreateAnUserRequest };
