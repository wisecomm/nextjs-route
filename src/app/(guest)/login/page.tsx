"use client";

import { apiCall } from "@/app/api/callSampl01";
import React from "react";

function page() {
  //  const [boards, setBoards] = useState<Board[]>([]);

  const handleLogin = async () => {
    console.log("login");
    const { data, status, error } = apiCall();
  };

  return (
    <div>
      <button onClick={handleLogin}>로그인</button>
      <p>로그인</p>
    </div>
  );
}

export default page;
