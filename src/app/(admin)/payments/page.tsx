import { Payment, columns } from "./columns";
import { DataTable } from "@/components/custom/datatable/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import ChildHeaderBar from "@/components/custom/topheaderbar/ChildHeaderBar";

async function getData(): Promise<Payment[]> {
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

export default async function DemoPage() {
  const data = await getData();

  return (
    <div style={{ backgroundColor: 'rgb(232, 234, 244)' }}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChildHeaderBar />
        <div className="bg-white p-2">
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <DataTable
            columns={columns}
            data={data}
            DataTableToolbar={DataTableToolbar}
          />
        </div>
        </div>
        </div>
    </div>
  );
}
