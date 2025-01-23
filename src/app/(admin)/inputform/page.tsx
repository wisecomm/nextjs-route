"use client";

import { Input } from "@/components/ui";

function InputForm() {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-auto">
      <div className="w-[1440px] min-h-[900px] mx-auto p-8">
        <div className="grid grid-cols-2 gap-x-[80px] gap-y-[60px]">
          <div className="w-[680px] h-[260px] bg-red-200 rounded-lg shadow-md p-4">
            <p>이메일</p>
            <Input
              id="email"
              type="email"
              required
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div className="w-[680px] h-[260px] bg-blue-200 rounded-lg shadow-md p-4">
            Box 2
          </div>
          <div className="w-[680px] h-[260px] bg-green-200 rounded-lg shadow-md p-4">
            Box 3
          </div>
          <div className="w-[680px] h-[260px] bg-yellow-200 rounded-lg shadow-md p-4">
            Box 4
          </div>
          <div className="w-[680px] h-[260px] bg-purple-200 rounded-lg shadow-md p-4">
            Box 5
          </div>
          <div className="w-[680px] h-[260px] bg-pink-200 rounded-lg shadow-md p-4">
            Box 6
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
