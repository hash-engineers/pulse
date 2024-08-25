'use client';

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
} from '@/components/ui/table';
import { data } from '@/lib/monitor';

type Props = {
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

const columns: ColumnDef<Props>[] = [
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

export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
