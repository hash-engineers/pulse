'use server';

import axios from 'axios';
import { api, commonHeaders } from '@/lib/api-routes';
import { CreateAMonitor, Monitor } from '@/types/monitor';

type GetAllMonitors = { userId: string };

export async function getAllMonitors({
  userId,
}: GetAllMonitors): Promise<Monitor[] | null> {
  try {
    const res = await axios.get(api.monitors.route + '?userId' + '=' + userId, {
      headers: commonHeaders,
    });

    return await res.data?.data;
  } catch (error: any) {
    return null;
  }
}

type CreateAMonitorAction = { data: CreateAMonitor };

export async function createAMonitor({
  data,
}: CreateAMonitorAction): Promise<Monitor | null> {
  try {
    const res = await axios.post(api.monitors.route, data, {
      headers: commonHeaders,
    });

    return await res.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Something went wrong!');
  }
}

type GetAMonitorById = { id: string; incidentStartAt?: string };

export async function getAMonitorById({
  id,
  incidentStartAt,
}: GetAMonitorById): Promise<Monitor | null> {
  try {
    const res = await axios.get(
      api.monitors.route + '/' + id + '?incidentStartAt=' + incidentStartAt,
      { headers: commonHeaders }
    );

    return await res.data?.data;
  } catch (error) {
    return null;
  }
}