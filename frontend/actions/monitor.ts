'use server';

import axios from 'axios';
import { CreateAMonitor, Monitor } from '@/types/monitor';
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

type CreateAMonitorAction = { data: CreateAMonitor };

export async function createAMonitor({
  data,
}: CreateAMonitorAction): Promise<Monitor | null> {
  try {
    const res = await axios.post(rootApi + monitors, data, {
      headers: commonHeaders,
    });

    return res.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Something went wrong!');
  }
}
