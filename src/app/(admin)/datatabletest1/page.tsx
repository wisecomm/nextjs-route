import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { columns } from "@/components/custom/datatable1/columns";
import { DataTable } from "@/components/custom/datatable1/data-table";
import { taskSchema } from "./data/schema";

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(admin)/datatabletest1/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

async function DataTableTest() {
  const tasks = await getTasks();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </>
  );
}

export default DataTableTest;
