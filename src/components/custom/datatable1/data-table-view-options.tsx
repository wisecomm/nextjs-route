"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Filter, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  onSearchGo?: (columnId: string, searchValue: string) => void;
}

export function DataTableViewOptions<TData>({
  table,
  onSearchGo,
}: DataTableViewOptionsProps<TData>) {
  // 필트 선택 처리
  const [selectedFilterId, setSelectedFilterId] = useState<string>("");
  const handleFilterIdChange = (value: string) => {
    setSelectedFilterId(value);
  };

  // 검색 처리
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  /** 검색 */
  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("검색 호출=" + searchValue);
      // 서치 함수 호출
      if (onSearchGo) {
        onSearchGo(selectedFilterId, searchValue);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="검색어..."
        value={searchValue}
        onChange={handleSearchValueChange}
        onKeyDown={handleSearch}
        className="h-8 w-[100px] lg:w-[200px]"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <Filter className="mr-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuRadioGroup
            value={selectedFilterId}
            onValueChange={handleFilterIdChange}
          >
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => (
                <DropdownMenuRadioItem
                  key={column.id}
                  value={column.id}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuRadioItem>
              ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <Settings2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
