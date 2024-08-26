import axios from 'axios';
import { api } from '@/lib/api';
import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';
import { DataTable } from './_data-table';
import { Monitor } from '@/types/monitor';
import { getDate } from '@/utils/date-time/get-date';

type Props = { params: { id: string } };

export default async function MonitorDetails({ params: { id } }: Props) {
  let monitor: Monitor | null = null;
  let monitorForToday: Monitor | null = null;
  let monitorForLast7Days: Monitor | null = null;
  let monitorForLast30Days: Monitor | null = null;
  let monitorForLast365Days: Monitor | null = null;

  const { startOfToday, startOf7DaysAgo, startOf30DaysAgo, startOf365DaysAgo } =
    getDate();

  try {
    monitor = (await axios.get(`${api}/monitors/${id}`)).data.data;
    monitorForToday = (
      await axios.get(`${api}/monitors/${id}?startDate=${startOfToday}`)
    ).data.data;
    monitorForLast7Days = (
      await axios.get(`${api}/monitors/${id}?startDate=${startOf7DaysAgo}`)
    ).data.data;
    monitorForLast30Days = (
      await axios.get(`${api}/monitors/${id}?startDate=${startOf30DaysAgo}`)
    ).data.data;
    monitorForLast365Days = (
      await axios.get(`${api}/monitors/${id}?startDate=${startOf365DaysAgo}`)
    ).data.data;
  } catch (error) {
    console.error('Error From Fetch Monitor Data ->', error);
  }

  if (!monitor) return null;

  const data = [
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Today',
      availability: '100.0000%',
      incidents: 0,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 7 days',
      availability: '100.0000%',
      incidents: 0,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 30 days',
      availability: '100.0000%',
      incidents: 0,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 365 days',
      availability: '100.0000%',
      incidents: 0,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'All Time (Last 3 days)',
      availability: '100.0000%',
      incidents: 0,
      longestIncident: 'none',
      averageIncident: 'none',
    },
  ];

  return (
    <section className="space-y-4 pt-12">
      <Status name={monitor.name} url={monitor.url} status={monitor.status} />
      <Actions />
      <KeyInfos incidents={monitor.incidents} />
      <DataTable />
    </section>
  );
}
