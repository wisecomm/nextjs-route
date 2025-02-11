"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,  
  getSortedRowModel,  
  SortingState,  
  useReactTable,
} from "@tanstack/react-table"
 
import { Table as TanstackTable } from '@tanstack/react-table';

import {
    Button,
    Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { useState } from "react"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  DataTableToolbar?: React.ComponentType<{ table: TanstackTable<TData> }>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    DataTableToolbar,
  }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [currentPageGroup, setCurrentPageGroup] = useState(0);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
      },
     })

    const getPageNumbers = () => {
      const totalPages = table.getPageCount();
      const startPage = currentPageGroup * 5 + 1;
      const endPage = Math.min(startPage + 4, totalPages);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };
   
    return (
      <div className="space-y-4">
           {DataTableToolbar && <DataTableToolbar table={table} />}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
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
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            if (table.getState().pagination.pageIndex % 5 === 0) {
              setCurrentPageGroup(prev => prev - 1);
            }
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        {getPageNumbers().map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={table.getState().pagination.pageIndex + 1 === pageNumber ? "default" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(pageNumber - 1)}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            if ((table.getState().pagination.pageIndex + 1) % 5 === 0) {
              setCurrentPageGroup(prev => prev + 1);
            }
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <Separator  className="my-4"/>

      </div>      
    )
  }