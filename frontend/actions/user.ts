'use server';

import axios from 'axios';
import { User } from '@/types/user';
import { commonHeaders, rootApi, users } from '@/lib/api';

type GetAnUserById = { id: string };

export async function getAnUserById({
  id,
}: GetAnUserById): Promise<User | null> {
  try {
    const res = await axios.get(rootApi + users + '/' + id, {
      headers: commonHeaders,
    });

    return res.data?.data;
  } catch (error: any) {
    return null;
  }
}
