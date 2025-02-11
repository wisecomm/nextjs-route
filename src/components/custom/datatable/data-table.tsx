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

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
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
    const [pageInput, setPageInput] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0); // Add this line

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
        pagination: {
          pageSize,
          pageIndex, // Use the state variable
        },
      },
      onPaginationChange: (updater) => {
        if (typeof updater === 'function') {
          const newState = updater(table.getState().pagination)
          setPageSize(newState.pageSize)
          setPageIndex(newState.pageIndex);
        }
      },
     })

    const getPageNumbers = () => {
      const totalPages = table.getPageCount();
      const startPage = currentPageGroup * 5;
      const endPage = Math.min(startPage + 4, totalPages - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i + 1);
    };

    const handleGoToPage = () => {
      const pageNumber = parseInt(pageInput);
      if (isNaN(pageNumber)) return;
      
      const totalPages = table.getPageCount();
      if (pageNumber <= 0) {  // Changed from pageNumber < 1 to pageNumber <= 0
        table.setPageIndex(0);  // This will set to page 1 (index 0)
        setCurrentPageGroup(0); // Reset to first page group
      } else if (pageNumber > totalPages) {
        table.setPageIndex(totalPages - 1);
        setCurrentPageGroup(Math.floor((totalPages - 1) / 5));
      } else {
        table.setPageIndex(pageNumber - 1);
        setCurrentPageGroup(Math.floor((pageNumber - 1) / 5));
      }
      setPageInput('');
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
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const newPageSize = Number(value);
              const currentRow = pageSize * pageIndex;
              const newPageIndex = Math.floor(currentRow / newPageSize);
              
              table.setPageSize(newPageSize);
              table.setPageIndex(0); // Reset to first page
              setCurrentPageGroup(0); // Reset page group to first group
              setPageSize(newPageSize);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const prevPageIndex = table.getState().pagination.pageIndex - 1;
              table.previousPage();
              if (prevPageIndex >= 0 && prevPageIndex % 5 === 4) {
                setCurrentPageGroup(prev => Math.max(0, prev - 1));
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
              onClick={() => {
                table.setPageIndex(pageNumber - 1);
              }}
            >
              {pageNumber}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              const nextPageIndex = table.getState().pagination.pageIndex + 1;
              if (nextPageIndex % 5 === 0) {
                setCurrentPageGroup(prev => prev + 1);
              }
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <input
            type="text"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            className="w-16 rounded-md border px-2 py-1 text-sm"
            placeholder="Page"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoToPage}
          >
            Go
          </Button>
        </div>
      </div>
      <Separator  className="my-4"/>
      </div>      
    )
  }