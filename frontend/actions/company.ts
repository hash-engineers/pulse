'use server';

import axios from 'axios';
import { headers } from 'next/headers';
import { companies, contentType, rootApi } from '@/lib/api';
import { Company, CreateCompanyFormData } from '@/types/company';

export async function createCompany(
  data: CreateCompanyFormData
): Promise<Company | null> {
  try {
    const res = await axios.post(rootApi + companies, data, {
      headers: { ...headers, ...contentType },
    });

    return res.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Something went wrong!');
  }
}
