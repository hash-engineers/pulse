'use server';

import axios from 'axios';
import { User } from '@/types/user';
import { api, commonHeaders } from '@/lib/api-routes';

type GetAnUserById = { id: string };

export async function getAnUserById({
  id,
}: GetAnUserById): Promise<User | null> {
  try {
    const res = await axios.get(api.users.route + '/' + id, {
      headers: commonHeaders,
    });

    return await res.data?.data;
  } catch (error: any) {
    return null;
  }
}
