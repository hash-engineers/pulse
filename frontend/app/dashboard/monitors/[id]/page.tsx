import axios from 'axios';
import { api } from '@/lib/api';
import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';
import { DataTable } from './_data-table';
import { formatDate } from '@/helpers/date-time';
import { getDate } from '@/utils/date-time/get-date';
import { calculateMonitorAvailability } from '@/helpers/monitor';
import { Monitor, MonitorDetailsTableRow } from '@/types/monitor';

type Props = { params: { id: string } };

export default async function Page({ params: { id } }: Props) {
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

  const date = formatDate(monitor.createdAt);

  const monitorDetailsTableRowData: MonitorDetailsTableRow<string>[] = [
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Today',
      availability: calculateMonitorAvailability(monitorForToday, startOfToday),
      incidents: monitorForToday.incidents.length,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 7 days',
      availability: calculateMonitorAvailability(
        monitorForLast7Days,
        startOf7DaysAgo
      ),
      incidents: monitorForLast7Days.incidents.length,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 30 days',
      availability: calculateMonitorAvailability(
        monitorForLast30Days,
        startOf30DaysAgo
      ),
      incidents: monitorForLast30Days.incidents.length,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: 'Last 365 days',
      availability: calculateMonitorAvailability(
        monitorForLast365Days,
        startOf365DaysAgo
      ),
      incidents: monitorForLast365Days.incidents.length,
      longestIncident: 'none',
      averageIncident: 'none',
    },
    {
      id: monitor.id,
      downtime: 'none',
      timePeriod: `Since ${date} untill today`,
      availability: calculateMonitorAvailability(monitor, monitor.createdAt),
      incidents: monitor.incidents.length,
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
