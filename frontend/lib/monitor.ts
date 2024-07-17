import { Props } from '@/app/dashboard/monitors/_monitor-key-info.';
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

const monitors: Props[] = [
  {
    name: '',
    url: 'website.com',
    status: 'Up',
    checkingTime: '3m',
    checkedAt: '2d 19h 5m',
  },
  {
    name: '',
    url: 'websit5e.com',
    status: 'Down',
    checkingTime: '3m',
    checkedAt: '2d 19h 5m',
  },
  {
    name: '',
    url: 'Google',
    status: 'Pending',
    checkingTime: '3m',
    checkedAt: '2d 19h 5m',
  },
  {
    name: '',
    url: 'website7.com',
    status: 'Paused',
    checkingTime: '3m',
    checkedAt: '2d 19h 5m',
  },
  {
    name: 'New Website',
    url: 'website3.com',
    status: 'Up',
    checkingTime: '3m',
    checkedAt: '2d 19h 5m',
  },
];

const whenToAlert = [
  'URL becomes unavailable',
  "URL doesn't contain keyword",
  'URL contains a keyword',
  'URL returns HTTP status other than',
  "Host doesn't respond to ping",
];

const whenDoesNotAcknowledge = [
  'Do nothing',
  'Immediately alert all other team members',
  'Within 3 minutes, alert all other team members',
  'Within 5 minutes, alert all other team members',
  'Within 10 minutes, alert all other team members',
];

export { data, columns, monitors, whenToAlert, whenDoesNotAcknowledge };
