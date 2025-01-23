"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui";
import { DataTableColumnHeader } from "@/components/custom/datatable1/data-table-column-header";

export type Payment = {
  id: string;
  title: string;
  amount: number;
  status: string;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: "",
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="아이디" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-[80px]">{row.getValue("id")}</div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-[100px]">{row.getValue("email")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span>{row.getValue("amount")}</span>
        </div>
      );
    },
  },
];
