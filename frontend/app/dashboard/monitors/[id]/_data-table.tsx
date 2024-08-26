'use client';

import { MonitorDetailsTableRow } from '@/types/monitor';
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

type Props = { data: MonitorDetailsTableRow[] };

const columns: ColumnDef<MonitorDetailsTableRow>[] = [
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

export function DataTable({ data }: Props) {
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
