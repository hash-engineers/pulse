'use server';

import axios from 'axios';
import { Monitor } from '@/types/monitor';
import { commonHeaders, monitors, rootApi } from '@/lib/api';

type GetAllMonitors = { userId: string };

export async function getAllMonitors({
  userId,
}: GetAllMonitors): Promise<Monitor[] | null> {
  try {
    const res = await axios.get(rootApi + monitors + '?userId' + '=' + userId, {
      headers: commonHeaders,
    });

    return res.data?.data;
  } catch (error: any) {
    return null;
  }
}
