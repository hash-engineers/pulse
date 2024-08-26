'use client';

import { MonitorDetailsTableRow } from '@/types/monitor';
import { MONITOR_DETAILS_TABLE_COLUMNS } from '@/lib/monitor';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
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

export function DataTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns: MONITOR_DETAILS_TABLE_COLUMNS,
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
              <TableCell
                colSpan={MONITOR_DETAILS_TABLE_COLUMNS.length}
                className="h-24 text-center"
              >
                Not enough data to show the table!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
