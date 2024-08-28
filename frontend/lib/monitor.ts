import { ColumnDef } from '@tanstack/react-table';
import { MonitorDetailsTableRow } from '@/types/monitor';

const MONITOR_DETAILS_TABLE_COLUMNS: ColumnDef<
  MonitorDetailsTableRow<string>
>[] = [
  {
    accessorKey: 'timePeriod',
    header: 'Time Period',
  },
  {
    accessorKey: 'availability',
    header: 'Availability',
  },
  {
    accessorKey: 'downtime',
    header: 'Downtime',
  },
  {
    accessorKey: 'incidents',
    header: 'Incidents',
  },
  {
    accessorKey: 'longestIncident',
    header: 'Longest Incident',
  },
  {
    accessorKey: 'averageIncident',
    header: 'Average Incident',
  },
];

export { MONITOR_DETAILS_TABLE_COLUMNS };
