import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';
import { DataTable } from './_data-table';
import { formatDate } from '@/helpers/date-time';
import { Spinner } from '@/components/ui/spinner';
import { getAMonitorById } from '@/actions/monitor';
import { getDate } from '@/utils/date-time/get-date';
import { MonitorDetailsTableRow } from '@/types/monitor';
import { calculateMonitorAvailability } from '@/helpers/monitor';

type Props = { params: { id: string } };

export default async function Page({ params: { id } }: Props) {
  const { startOfToday, startOf7DaysAgo, startOf30DaysAgo, startOf365DaysAgo } =
    getDate();

  const [
    monitor,
    monitorForToday,
    monitorForLast7Days,
    monitorForLast30Days,
    monitorForLast365Days,
  ] = await Promise.all([
    getAMonitorById({ id, incidentStartAt: startOfToday }),
    getAMonitorById({
      id,
      incidentStartAt: startOfToday,
    }),
    getAMonitorById({
      id,
      incidentStartAt: startOf7DaysAgo,
    }),
    getAMonitorById({
      id,
      incidentStartAt: startOf30DaysAgo,
    }),
    getAMonitorById({
      id,
      incidentStartAt: startOf365DaysAgo,
    }),
  ]);

  if (
    !monitor ||
    !monitorForToday ||
    !monitorForLast7Days ||
    !monitorForLast30Days ||
    !monitorForLast365Days
  )
    return <Spinner />;

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
