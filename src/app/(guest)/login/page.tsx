"use client";

import { apiCall } from "@/app/api/callSampl01";
import React from "react";

function page() {
  //  const [boards, setBoards] = useState<Board[]>([]);

  const handleLogin = async () => {
    try {
      const { data, status } = await apiCall();
      
      console.log("login=" + data);
      console.log("login=" + status);
    } catch (error) {
      console.log("login error: " + error);
    }

  };

  return (
    <div>
      <button onClick={handleLogin}>로그인</button>
      <p>로그인</p>
    </div>
  );
}

export default page;
