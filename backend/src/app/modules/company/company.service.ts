import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { UserService } from '../user/user.service';
import { CreateCompanyRequest } from './company.type';

const createCompany = async (data: CreateCompanyRequest) => {
  const isCompanyExist = await prisma.company.findUnique({
    where: { name: data.companyName },
  });

  if (isCompanyExist)
    throw new ApiError(409, 'Company already exist with this name!');

  const isTheUserEngagedWithACompany = await prisma.user.findUnique({
    where: { id: data.id },
  });

  if (isTheUserEngagedWithACompany)
    throw new ApiError(409, "You'r already engaged with a company!");

  const company = await prisma.$transaction(async tx => {
    const createdCompany = await tx.company.create({
      data: { name: data.companyName, size: data.size },
    });

    await UserService.createAnUser(tx, {
      id: data.id,
      name: data.name,
      email: data.email,
      companyName: createdCompany.name,
    });

    return createdCompany;
  });

  if (!company) throw new ApiError(400, 'Failed to create company');

  return company;
};

export const CompanyService = { createCompany };
