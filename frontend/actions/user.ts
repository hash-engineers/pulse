'use server';

import axios from 'axios';
import { User } from '@/types/user';
import { headers } from 'next/headers';
import { contentType, rootApi, users } from '@/lib/api';

type GetAnUserById = { id: string };

export async function getAnUserById({
  id,
}: GetAnUserById): Promise<User | null> {
  try {
    const res = await axios.get(rootApi + users + '/' + id, {
      headers: { ...headers, ...contentType },
    });

    return res.data?.data;
  } catch (error: any) {
    return null;
  }
}
