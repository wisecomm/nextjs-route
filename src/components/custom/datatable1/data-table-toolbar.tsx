"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  const [selectedFilterValue, setSelectedFilterValue] = useState<string>("");
  function handleOnChangeFilter(columnId: string) {
    setSelectedFilterValue(columnId);
    console.log("XXXXXX" + columnId);
  }

  const [searchTerm, setSearchTerm] = useState<string>("");
  /** 검색 */
  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      toast({
        variant: 'destructive',
        title: "찾기 검색어",
        description: "검색어=" + searchTerm,
      });

      // search만 호출하도록 변경, getTasks가 불필요하게 호출되지 않게 함
      //            search(searchTerm);
    }
  };

  // 검색어 상태 업데이트
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="검색어..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyDown={handleSearch}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions table={table} onChangeFilter={handleOnChangeFilter} />
    </div>
  );
}
