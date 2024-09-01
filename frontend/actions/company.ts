'use server';

import axios from 'axios';

import { api, commonHeaders } from '@/lib/api-routes';
import { Company, CreateCompanyFormData } from '@/types/company';

export async function createCompany(
  data: CreateCompanyFormData
): Promise<Company> {
  try {
    const res = await axios.post(api.companies.route, data, {
      headers: commonHeaders,
    });

    return await res.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Something went wrong!');
  }
}
