import { Company, User } from '@prisma/client';

type CreateCompanyRequest = { companyName: string } & Company &
  Pick<User, 'name' | 'email'>;

export { CreateCompanyRequest };
