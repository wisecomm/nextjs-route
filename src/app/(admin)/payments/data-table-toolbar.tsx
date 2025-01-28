"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/custom/datatable1/data-table-view-options";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui";

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
        <Label> 입력폼 만들기 </Label>
      </div>
      <DataTableViewOptions table={table} onSearchGo={handleOnSearchGo} />
    </div>
  );
}
