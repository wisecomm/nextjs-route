"use client"

import React, { useEffect, useState } from 'react'
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/custom/datatable/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import ChildHeaderBar from "@/components/custom/topheaderbar/ChildHeaderBar";
import { Button } from "@/components/ui/button";
import { Modal } from "./modal";
import { fetchData } from "./testdata";

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
          <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
            <DataTable
              columns={columns}
              data={tableData}
              DataTableToolbar={DataTableToolbar}
              onRowSelect={(selectedRow) => {
                console.log('XXXXXXXX Selected row:', selectedRow);
                // Handle the selected row
              }}
            />
            <div className='flex items-center justify-between'>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="lg">
                  조회
                </Button>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="lg" onClick={() => setIsModalOpen(true)}>
                  추가
                </Button>
                <Button variant="outline" size="lg">
                  삭제
                </Button>
              </div>
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
