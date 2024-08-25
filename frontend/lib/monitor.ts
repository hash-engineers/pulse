import { ColumnDef } from '@tanstack/react-table';

type Payment = {
  id: string;
  downtime: string;
  timePeriod:
    | 'Today'
    | 'Last 7 days'
    | 'Last 30 days'
    | 'Last 365 days'
    | 'All Time (Last 3 days)'
    | 'Since 12 July 2024 untill today';
  availability: string;
  incidents: number;
  longestIncident: string;
  averageIncident: string;
};

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    downtime: 'none',
    timePeriod: 'Today',
    availability: '100.0000%',
    incidents: 0,
    longestIncident: 'none',
    averageIncident: 'none',
  },
  {
    id: '3u1reuv4',
    downtime: 'none',
    timePeriod: 'Last 7 days',
    availability: '100.0000%',
    incidents: 0,
    longestIncident: 'none',
    averageIncident: 'none',
  },
  {
    id: 'derv1ws0',
    downtime: 'none',
    timePeriod: 'Last 30 days',
    availability: '100.0000%',
    incidents: 0,
    longestIncident: 'none',
    averageIncident: 'none',
  },
  {
    id: '5kma53ae',
    downtime: 'none',
    timePeriod: 'Last 365 days',
    availability: '100.0000%',
    incidents: 0,
    longestIncident: 'none',
    averageIncident: 'none',
  },
  {
    id: 'bhqecj4p',
    downtime: 'none',
    timePeriod: 'All Time (Last 3 days)',
    availability: '100.0000%',
    incidents: 0,
    longestIncident: 'none',
    averageIncident: 'none',
  },
];

const columns: ColumnDef<Payment>[] = [
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

export { columns, data };
