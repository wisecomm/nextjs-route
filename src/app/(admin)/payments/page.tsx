"use client"

import React, { useEffect, useState } from 'react'
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/custom/datatable/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import ChildHeaderBar from "@/components/custom/topheaderbar/ChildHeaderBar";
import { Button } from "@/components/ui";
import { Modal } from "./modal";

async function fetchData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "오늘 업데이터된 자료 입니다 ㅎㅎㅎㅎ 1",
      amount: 100,
      status: "pending",
      email: "B@example.com",
    },
    {
      id: "728ed52g",
      title: "오늘 업데이터된 자료 입니다 ㅎㅎㅎㅎ 2",
      amount: 500,
      status: "processing",
      email: "K@example.com",
    },
    {
      id: "728ed52h",
      title: "오늘 업데이터된 자료 입니다 ㅎㅎㅎㅎ 3",
      amount: 500,
      status: "processing",
      email: "A@example.com",
    },
    // ...
  ];
}

export default function DemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Payment[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchData();
      setTableData(data);
    }
    loadData();
  }, []);

  const handleAdd = (newData: Payment) => {
    setTableData([...tableData, newData]);
  };

  return (
    <div style={{ backgroundColor: 'rgb(232, 234, 244)' }}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChildHeaderBar />
        <div className="bg-white p-2">
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <DataTable
            columns={columns}
            data={tableData}
            DataTableToolbar={DataTableToolbar}
          />
        <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          추가
        </Button>
        <Button
          variant="outline"
          size="sm"
        >
          삭제
        </Button>
      </div>
        </div>

        </div>
        </div>
        <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />        
    </div>
  );
}
