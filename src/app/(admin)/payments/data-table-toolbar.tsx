"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/custom/datatable1/data-table-view-options";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui";
import { LabelDatePicker } from "@/components/custom/datepicker/LabelDatePicker";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  function handleOnSearchGo(columnId: string, searchValue: string) {
    toast({
      variant: "destructive",
      title: "검색 실행",
      description: "columnId=" + columnId + ", searchValue=" + searchValue,
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <LabelDatePicker label={"시작일"} value={startDate} onChange={setStartDate} />
        <LabelDatePicker label={"종료일"} value={endDate} onChange={setEndDate} />
      </div>
      <DataTableViewOptions table={table} onSearchGo={handleOnSearchGo} />
    </div>
  );
}
