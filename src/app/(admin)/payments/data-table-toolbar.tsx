"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/custom/datatable1/data-table-view-options";
import { toast } from "@/hooks/use-toast";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  function handleOnSearchGo(columnId: string, searchValue: string) {
    toast({
      variant: "destructive",
      title: "검색 실행",
      description: "columnId=" + columnId + ", searchValue=" + searchValue,
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="검색어..."
          value="{searchTerm}"
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions table={table} onSearchGo={handleOnSearchGo} />
    </div>
  );
}
