import { Company, User } from '@prisma/client';

type CreateCompanyRequest = { companyName: string } & Company &
  Pick<User, 'id' | 'name' | 'email'>;

export { CreateCompanyRequest };
