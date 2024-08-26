import axios from 'axios';
import { api } from '@/lib/api';
import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';
import { DataTable } from './_data-table';
import { getDate } from '@/utils/date-time/get-date';
import { calculateMonitorAvailability } from '@/helpers/monitor';
import { Monitor, MonitorDetailsTableRow } from '@/types/monitor';

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

  if (
    !monitor ||
    !monitorForToday ||
    !monitorForLast7Days ||
    !monitorForLast30Days ||
    !monitorForLast365Days
  )
    return null;

  const monitorDetailsTableRowData: MonitorDetailsTableRow[] = [
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Today',
      availability: calculateMonitorAvailability(monitorForToday),
      incidents: monitorForToday.incidents.length,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 7 days',
      availability: calculateMonitorAvailability(monitorForLast7Days),
      incidents: monitorForLast7Days.incidents.length,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 30 days',
      availability: calculateMonitorAvailability(monitorForLast30Days),
      incidents: monitorForLast30Days.incidents.length,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 365 days',
      availability: calculateMonitorAvailability(monitorForLast365Days),
      incidents: monitorForLast365Days.incidents.length,
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
      <KeyInfos incidents={monitor.incidents} createdAt={monitor.createdAt} />
      <DataTable data={monitorDetailsTableRowData} />
    </section>
  );
}
