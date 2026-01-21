import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilterIcon,
  SearchIcon,
} from 'lucide-react';
import { Kbd } from './ui/kbd';
import { Button } from './ui/button';
interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
type Filter = 'view-all' | 'monitored' | 'unmonitored';
const DataTable = <Data, value>({ columns, data }: Props<Data, value>) => {
  const [filter, setFilter] = useState<Filter>('view-all');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      sorting,
      rowSelection,
    },
  });
  return (
    <div className='max-md:-mx-4 max-lg:-mx-8'>
      <div className=' flex gap-4 p-6 max-lg:flex-col lg:justify-between lg:py-3'>
        <ToggleGroup
          type='single'
          variant='outline'
          value={filter}
          onValueChange={(value: Filter) => setFilter(value)}
        >
          <ToggleGroupItem value='view-all'>View all</ToggleGroupItem>
          <ToggleGroupItem value='monitored'>Monitored</ToggleGroupItem>
          <ToggleGroupItem value='unmonitored'>Unmonitored</ToggleGroupItem>
        </ToggleGroup>

        <div className='flex gap-3'>
          <InputGroup>
            <InputGroupInput
              placeholder='Search'
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table
                  .getColumn('name')
                  ?.setFilterValue(event.currentTarget.value)
              }
            />

            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>

            <InputGroupAddon align='inline-end'>
              <Kbd>⌘k</Kbd>
            </InputGroupAddon>
          </InputGroup>

          <Button variant='outline'>
            <ListFilterIcon />

            <span className='max-lg:hidden'>Filters</span>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader className='bg-secondary/40 border-t'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className='px-4'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className='p-4'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-24 text-center'
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='flex gap-3 justify-between items-center border-t py-3 px-6 '>
        <p className='text-sm font-semibold text-muted-foreground max-md:mx-auto md:me-auto'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </p>

        <Button
          variant='outline'
          className='max-md:-order-1'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className='md:hidden' />
          <span className='max-md:hidden'>Previous</span>
        </Button>

        <Button
          variant='outline'
          className='max-md:-order-0'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className='md:hidden' />
          <span className='max-md:hidden'>Next</span>
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
