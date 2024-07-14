'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
};

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    downtime: 'none',
    timePeriod: 'Today',
    availability: '100.0000%',
  },
  {
    id: '3u1reuv4',
    downtime: 'none',
    timePeriod: 'Last 7 days',
    availability: '100.0000%',
  },
  {
    id: 'derv1ws0',
    downtime: 'none',
    timePeriod: 'Last 30 days',
    availability: '100.0000%',
  },
  {
    id: '5kma53ae',
    downtime: 'none',
    timePeriod: 'Last 365 days',
    availability: '100.0000%',
  },
  {
    id: 'bhqecj4p',
    downtime: 'none',
    timePeriod: 'All Time (Last 3 days)',
    availability: '100.0000%',
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
