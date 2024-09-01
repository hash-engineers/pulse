'use server';

import axios from 'axios';
import { commonHeaders, companies, rootApi } from '@/lib/api';
import { Company, CreateCompanyFormData } from '@/types/company';

export async function createCompany(
  data: CreateCompanyFormData
): Promise<Company> {
  try {
    const res = await axios.post(rootApi + companies, data, {
      headers: commonHeaders,
    });

    return res.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Something went wrong!');
  }
}
