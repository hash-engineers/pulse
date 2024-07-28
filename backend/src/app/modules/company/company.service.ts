import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { CreateCompanyRequest } from './company.type';

const createCompany = async (data: CreateCompanyRequest) => {
  const isCompanyExist = await prisma.company.findUnique({
    where: { name: data.name },
  });

  if (isCompanyExist)
    throw new ApiError(409, 'Company already exist with this name');

  const company = await prisma.$transaction(async tx => {
    const createdCompany = await tx.company.create({
      data: { name: data.companyName, size: data.size },
    });

    const isUserExist = await tx.user.findUnique({
      where: { email: data.email },
    });

    if (!isUserExist) {
      await tx.user.create({
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          companyName: createdCompany.name,
        },
      });
    }

    return createdCompany;
  });

  if (!company) throw new ApiError(400, 'Failed to create company');

  return company;
};

export const CompanyService = { createCompany };
